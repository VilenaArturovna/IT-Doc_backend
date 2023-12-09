import { CommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from './create-order.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { OrderEntity } from '@modules/order/domain';
import { Currency, DateVO, MoneyVO, UuidVO } from '@libs/value-objects';
import { OrderStatus } from '@modules/order/types';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  OrderEntity
> {
  constructor(unitOfWork: OrderUnitOfWork) {
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

    let staff;

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
      price: MoneyVO.toVO({ amount: 0, currency: Currency.RUB }),
    });

    const createResult = await orderRepository.create(order);
    createResult.unwrap();

    return Result.ok(order);
  }
}
