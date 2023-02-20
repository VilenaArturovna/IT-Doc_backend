import { CommandHandler } from '@nestjs/cqrs';
import { UpdateDeadlineCommand } from './update-deadline.command';
import { DeadlineObjectionRepository } from '@modules/order/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { UuidVO } from '@libs/value-objects';
import { DeadlineEntity } from '@modules/order/domain';

@CommandHandler(UpdateDeadlineCommand)
export class UpdateDeadlineCommandHandler {
  constructor(private readonly repository: DeadlineObjectionRepository) {}

  async execute(
    command: UpdateDeadlineCommand,
  ): Promise<Result<DeadlineEntity, ExceptionBase>> {
    const { normal, id, urgent } = command.payload;

    const deadlineResult = await this.repository.getOneById(new UuidVO(id));
    const deadline = deadlineResult.unwrap();

    deadline.update({ normal, urgent });

    return this.repository.update(deadline);
  }
}
