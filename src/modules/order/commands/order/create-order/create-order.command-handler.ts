import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { DateVO, MoneyVO, UuidVO } from '@libs/value-objects';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';
import { OrderEntity, OrderStageEntity } from '@modules/order/domain';
import { CheckCodeVO } from '@modules/order/domain/value-objects';
import { OrderStatus } from '@modules/order/types';
import { StaffEntity } from '@modules/staff/domain';
import { Role } from '@modules/staff/types';
import { TelegramBotService } from '@modules/telegram/service';
import { ConfigService } from '@nestjs/config';
import { CommandHandler } from '@nestjs/cqrs';

import { CreateOrderCommand } from './create-order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  OrderEntity
> {
  constructor(
    unitOfWork: OrderUnitOfWork,
    private readonly configService: ConfigService,
    private readonly telegramBotService: TelegramBotService,
  ) {
    super(unitOfWork);
  }

  async handle(
    command: CreateOrderCommand,
  ): Promise<Result<OrderEntity, ExceptionBase>> {
    const {
      trxId,
      payload: { clientId, responsibleStaffId, ...payload },
    } = command;

    const orderRepository = this.unitOfWork.getOrderRepository(trxId);
    const clientRepository = this.unitOfWork.getClientRepository(trxId);
    const staffRepository = this.unitOfWork.getStaffRepository(trxId);
    const deadlineRepository = this.unitOfWork.getDeadlineRepository(trxId);

    const clientResult = await clientRepository.getOneById(
      new UuidVO(clientId),
    );
    const client = clientResult.unwrap();

    let staff: StaffEntity | undefined;

    if (responsibleStaffId) {
      const staffResult = await staffRepository.getOneById(
        new UuidVO(responsibleStaffId),
      );
      staff = staffResult.unwrap();
    }

    const status = payload.isRemoteOrder
      ? OrderStatus.REGISTERED
      : OrderStatus.IN_DIAGNOSTICS_QUEUE;

    const deadlineEntityResult = await deadlineRepository.getOneByName(status);
    const deadlineEntity = deadlineEntityResult.unwrap();

    const deadline = DateVO.now().addMinutes(
      deadlineEntity.getPriorityDeadline(payload.priority),
    );

    const order = OrderEntity.create({
      priority: payload.priority,
      status,
      client,
      responsibleStaff: staff,
      equipment: payload.equipment,
      equipmentCondition: payload.equipmentCondition,
      serialNumberEquipment: payload.serialNumberEquipment,
      malfunction: payload.malfunction,
      beneficiary: client.beneficiary,
      deadline,
      price: MoneyVO.ZERO(),
      stages: [
        OrderStageEntity.create({
          status,
          deadline,
          number: 1,
        }),
      ],
      checkCode: CheckCodeVO.generate(),
      isPaid: false,
    });

    const createResult = await orderRepository.create(order);
    const newOrder = createResult.unwrap();

    let telegramSendMessageResult: Result<void, ExceptionBase>;

    if (staff) {
      telegramSendMessageResult =
        await this.telegramBotService.newOrderHasBeenAssigned({
          orderId: newOrder.id.value,
          orderNumber: newOrder.number,
          tgId: staff.tgId,
        });
    } else {
      const engineersStaffResult = await staffRepository.getManyByRole(
        Role.ENGINEER,
      );
      const engineersStaff = engineersStaffResult.unwrap();

      telegramSendMessageResult =
        await this.telegramBotService.newOrderHasBeenRegistered({
          orderId: newOrder.id.value,
          orderNumber: newOrder.number,
          tgIds: engineersStaff.map((s) => s.tgId),
        });
    }

    if (!telegramSendMessageResult.isErr) {
      await this.telegramBotService.orderCreated(
        this.configService.get<string>('adminTgId'),
      );
    }

    return createResult;
  }
}
