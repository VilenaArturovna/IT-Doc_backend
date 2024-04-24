import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { Currency, DateVO, MoneyVO, UuidVO } from '@libs/value-objects';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';
import { OrderEntity } from '@modules/order/domain';
import { StaffEntity } from '@modules/staff/domain';
import { ConfigService } from '@nestjs/config';
import { CommandHandler } from '@nestjs/cqrs';

import { UpdateOrderCommand } from './update-order.command';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  OrderEntity
> {
  constructor(
    unitOfWork: OrderUnitOfWork,
    private readonly configService: ConfigService,
  ) {
    super(unitOfWork);
  }

  async handle(
    command: UpdateOrderCommand,
  ): Promise<Result<OrderEntity, ExceptionBase>> {
    const {
      trxId,
      payload: { id, ...payload },
    } = command;

    const orderRepository = this.unitOfWork.getOrderRepository(trxId);
    const staffRepository = this.unitOfWork.getStaffRepository(trxId);

    const orderResult = await orderRepository.getOneById(new UuidVO(id));
    const order = orderResult.unwrap();

    let staff: StaffEntity;

    if (payload.responsibleStaffId) {
      const staffResult = await staffRepository.getOneById(
        new UuidVO(payload.responsibleStaffId),
      );
      staff = staffResult.unwrap();
    }

    const margin = this.configService.get<number>('margin');

    order.update({
      ...payload,
      price: payload.price
        ? new MoneyVO({ currency: Currency.RUB, amount: payload.price })
        : undefined,
      responsibleStaff: staff,
      deadline: payload.deadline
        ? DateVO.now().addMinutes(payload.deadline)
        : undefined,
      margin,
    });

    return orderRepository.update(order);
  }
}
