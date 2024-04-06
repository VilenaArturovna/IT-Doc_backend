import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { DateVO, MoneyVO, UuidVO } from '@libs/value-objects';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';
import { OrderEntity, OrderStageEntity } from '@modules/order/domain';
import { OrderStatus } from '@modules/order/types';
import { StaffEntity } from '@modules/staff/domain';
import { CommandHandler } from '@nestjs/cqrs';

import { CreateOrderCommand } from './create-order.command';

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

    let staff: StaffEntity;

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
    });

    const createResult = await orderRepository.create(order);
    createResult.unwrap();

    return Result.ok(order);
  }
}
