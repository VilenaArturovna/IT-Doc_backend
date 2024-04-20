import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { UuidVO } from '@libs/value-objects';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';
import { OrderEntity } from '@modules/order/domain';
import { CommandHandler } from '@nestjs/cqrs';

import { OrderReadyCommand } from './order-ready.command';

@CommandHandler(OrderReadyCommand)
export class OrderReadyCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  OrderEntity
> {
  constructor(unitOfWork: OrderUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: OrderReadyCommand,
  ): Promise<Result<OrderEntity, ExceptionBase>> {
    const {
      trxId,
      payload: { id, refusalToRepair },
    } = command;

    const orderRepository = this.unitOfWork.getOrderRepository(trxId);

    const orderResult = await orderRepository.getOneById(new UuidVO(id));
    const order = orderResult.unwrap();

    order.ready(refusalToRepair);

    return orderRepository.update(order);
  }
}
