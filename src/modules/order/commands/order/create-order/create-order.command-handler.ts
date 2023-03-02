import { CommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from './create-order.command';
import {
  ClientObjectionRepository,
  DeadlineObjectionRepository,
  OrderObjectionRepository,
} from '@modules/order/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { StaffObjectionRepository } from '@modules/staff/database/repositories';
import { OrderEntity } from '@modules/order/domain';
import { Currency, DateVO, MoneyVO, UuidVO } from '@libs/value-objects';
import { OrderStatus } from '@modules/order/types';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler {
  constructor(
    private readonly orderRepository: OrderObjectionRepository,
    private readonly clientRepository: ClientObjectionRepository,
    private readonly staffRepository: StaffObjectionRepository,
    private readonly deadlineRepository: DeadlineObjectionRepository,
  ) {}

  async execute(
    command: CreateOrderCommand,
  ): Promise<Result<OrderEntity, ExceptionBase>> {
    const { clientId, responsibleStaffId, ...payload } = command.payload;

    const clientResult = await this.clientRepository.getOneById(
      new UuidVO(clientId),
    );
    const client = clientResult.unwrap();

    let staff;

    if (responsibleStaffId) {
      const staffResult = await this.staffRepository.getOneById(
        new UuidVO(responsibleStaffId),
      );
      staff = staffResult.unwrap();
    }

    const status = payload.isRemoteOrder
      ? OrderStatus.REGISTERED
      : OrderStatus.IN_DIAGNOSTICS_QUEUE;

    const deadlineEntityResult = await this.deadlineRepository.getOneByName(
      status,
    );
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

    const createResult = await this.orderRepository.create(order);
    createResult.unwrap();

    return Result.ok(order);
  }
}
