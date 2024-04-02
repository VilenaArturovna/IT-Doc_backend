import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { DateVO, UuidVO } from '@libs/value-objects';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';
import { OrderEntity } from '@modules/order/domain';
import { OrderStatus } from '@modules/order/types';
import { CommandHandler } from '@nestjs/cqrs';

import { TakeOrderToWorkCommand } from './take-order-to-work.command';

@CommandHandler(TakeOrderToWorkCommand)
export class TakeOrderToWorkCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  OrderEntity
> {
  constructor(unitOfWork: OrderUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: TakeOrderToWorkCommand,
  ): Promise<Result<OrderEntity, ExceptionBase>> {
    const {
      trxId,
      payload: { id },
    } = command;

    const orderRepository = this.unitOfWork.getOrderRepository(trxId);
    const deadlineRepository = this.unitOfWork.getDeadlineRepository(trxId);

    const orderResult = await orderRepository.getOneById(new UuidVO(id));
    const order = orderResult.unwrap();

    const deadlineEntityResult = await deadlineRepository.getOneByName(
      OrderStatus.IN_PROGRESS,
    );
    const deadlineEntity = deadlineEntityResult.unwrap();

    const deadline = DateVO.now().addMinutes(
      deadlineEntity.getPriorityDeadline(order.priority),
    );

    order.takeToWork(deadline);

    return orderRepository.update(order);
  }
}
