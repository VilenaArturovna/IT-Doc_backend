import { CommandHandler } from '@nestjs/cqrs';
import { PutInQueueForDiagnosticsCommand } from './put-in-queue-for-diagnostics.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { DateVO, UuidVO } from '@libs/value-objects';
import { OrderStatus } from '@modules/order/types';
import { OrderEntity } from '@modules/order/domain';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';

@CommandHandler(PutInQueueForDiagnosticsCommand)
export class PutInQueueForDiagnosticsCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  OrderEntity
> {
  constructor(unitOfWork: OrderUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: PutInQueueForDiagnosticsCommand,
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
      OrderStatus.IN_DIAGNOSTICS_QUEUE,
    );
    const deadlineEntity = deadlineEntityResult.unwrap();

    const deadline = DateVO.now().addMinutes(
      deadlineEntity.getPriorityDeadline(order.priority),
    );

    order.putInQueueForDiagnostics(deadline);

    return orderRepository.update(order);
  }
}
