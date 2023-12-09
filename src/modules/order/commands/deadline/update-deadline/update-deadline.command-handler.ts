import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { UuidVO } from '@libs/value-objects';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';
import { DeadlineEntity } from '@modules/order/domain';
import { CommandHandler } from '@nestjs/cqrs';

import { UpdateDeadlineCommand } from './update-deadline.command';

@CommandHandler(UpdateDeadlineCommand)
export class UpdateDeadlineCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  DeadlineEntity
> {
  constructor(unitOfWork: OrderUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: UpdateDeadlineCommand,
  ): Promise<Result<DeadlineEntity, ExceptionBase>> {
    const { normal, id, urgent } = command.payload;

    const repository = this.unitOfWork.getDeadlineRepository(command.trxId);

    const deadlineResult = await repository.getOneById(new UuidVO(id));
    const deadline = deadlineResult.unwrap();

    deadline.update({ normal, urgent });

    return repository.update(deadline);
  }
}
