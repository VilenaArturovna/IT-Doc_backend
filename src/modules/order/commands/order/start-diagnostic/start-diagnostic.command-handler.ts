import { CommandHandler } from '@nestjs/cqrs';
import { StartDiagnosticCommand } from './start-diagnostic.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { DateVO, UuidVO } from '@libs/value-objects';
import { OrderStatus } from '@modules/order/types';
import { OrderEntity } from '@modules/order/domain';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';

@CommandHandler(StartDiagnosticCommand)
export class StartDiagnosticCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  OrderEntity
> {
  constructor(unitOfWork: OrderUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: StartDiagnosticCommand,
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
      OrderStatus.DIAGNOSTIC,
    );
    const deadlineEntity = deadlineEntityResult.unwrap();

    const deadline = DateVO.now().addMinutes(
      deadlineEntity.getPriorityDeadline(order.priority),
    );

    order.startDiagnostic(deadline);

    return orderRepository.update(order);
  }
}
