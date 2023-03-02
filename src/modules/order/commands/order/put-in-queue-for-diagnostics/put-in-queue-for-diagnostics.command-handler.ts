import { CommandHandler } from '@nestjs/cqrs';
import { PutInQueueForDiagnosticsCommand } from './put-in-queue-for-diagnostics.command';
import {
  DeadlineObjectionRepository,
  OrderObjectionRepository,
} from '@modules/order/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { DateVO, UuidVO } from '@libs/value-objects';
import { OrderStatus } from '@modules/order/types';
import { OrderEntity } from '@modules/order/domain';

@CommandHandler(PutInQueueForDiagnosticsCommand)
export class PutInQueueForDiagnosticsCommandHandler {
  constructor(
    private readonly repository: OrderObjectionRepository,
    private readonly deadlineRepository: DeadlineObjectionRepository,
  ) {}

  async execute(
    command: PutInQueueForDiagnosticsCommand,
  ): Promise<Result<OrderEntity, ExceptionBase>> {
    const orderResult = await this.repository.getOneById(
      new UuidVO(command.payload.id),
    );
    const order = orderResult.unwrap();

    const deadlineEntityResult = await this.deadlineRepository.getOneByName(
      OrderStatus.IN_DIAGNOSTICS_QUEUE,
    );
    const deadlineEntity = deadlineEntityResult.unwrap();

    const deadline = DateVO.now().addMinutes(
      deadlineEntity.getPriorityDeadline(order.priority),
    );

    order.putInQueueForDiagnostics(deadline);

    return this.repository.update(order);
  }
}
