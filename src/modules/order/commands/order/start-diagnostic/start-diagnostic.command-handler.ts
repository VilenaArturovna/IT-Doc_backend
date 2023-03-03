import { CommandHandler } from '@nestjs/cqrs';
import { StartDiagnosticCommand } from './start-diagnostic.command';
import {
  DeadlineObjectionRepository,
  OrderObjectionRepository,
} from '@modules/order/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { DateVO, UuidVO } from '@libs/value-objects';
import { OrderStatus } from '@modules/order/types';
import { OrderEntity } from '@modules/order/domain';

@CommandHandler(StartDiagnosticCommand)
export class StartDiagnosticCommandHandler {
  constructor(
    private readonly repository: OrderObjectionRepository,
    private readonly deadlineRepository: DeadlineObjectionRepository,
  ) {}

  async execute(
    command: StartDiagnosticCommand,
  ): Promise<Result<OrderEntity, ExceptionBase>> {
    const orderResult = await this.repository.getOneById(
      new UuidVO(command.payload.id),
    );
    const order = orderResult.unwrap();

    const deadlineEntityResult = await this.deadlineRepository.getOneByName(
      OrderStatus.DIAGNOSTIC,
    );
    const deadlineEntity = deadlineEntityResult.unwrap();

    const deadline = DateVO.now().addMinutes(
      deadlineEntity.getPriorityDeadline(order.priority),
    );

    order.startDiagnostic(deadline);

    return this.repository.update(order);
  }
}
