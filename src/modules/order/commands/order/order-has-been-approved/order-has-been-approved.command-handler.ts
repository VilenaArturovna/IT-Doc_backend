import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { ConflictException } from '@libs/exceptions';
import { Result } from '@libs/utils';
import { DateVO, UuidVO } from '@libs/value-objects';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';
import { OrderEntity } from '@modules/order/domain';
import { OrderStatus } from '@modules/order/types';
import { CommandHandler } from '@nestjs/cqrs';

import { OrderHasBeenApprovedCommand } from './order-has-been-approved.command';

@CommandHandler(OrderHasBeenApprovedCommand)
export class OrderHasBeenApprovedCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  OrderEntity
> {
  constructor(unitOfWork: OrderUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: OrderHasBeenApprovedCommand,
  ): Promise<Result<OrderEntity, ExceptionBase>> {
    const {
      trxId,
      payload: { id, deadlineDate, status },
    } = command;

    if (
      ![
        OrderStatus.APPROVED,
        OrderStatus.APPROVED_AND_SPARE_PART_IS_ORDERED,
      ].includes(status)
    ) {
      return Result.fail(
        new ConflictException('Необходим статус согласования заявки'),
      );
    }

    const orderRepository = this.unitOfWork.getOrderRepository(trxId);
    const deadlineRepository = this.unitOfWork.getDeadlineRepository(trxId);

    const orderResult = await orderRepository.getOneById(new UuidVO(id));
    const order = orderResult.unwrap();

    let deadline: DateVO = new DateVO(deadlineDate);

    if (status === OrderStatus.APPROVED) {
      const deadlineEntityResult = await deadlineRepository.getOneByName(
        OrderStatus.DIAGNOSED,
      );
      const deadlineEntity = deadlineEntityResult.unwrap();

      deadline = DateVO.now().addMinutes(
        deadlineEntity.getPriorityDeadline(order.priority),
      );
    }

    order.approve(status, deadline);

    return orderRepository.update(order);
  }
}
