import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { UuidVO } from '@libs/value-objects';
import { TaskUnitOfWork } from '@modules/task/database/unit-of-work';
import { CommandHandler } from '@nestjs/cqrs';

import { RemoveTaskCommand } from './remove-task.command';

@CommandHandler(RemoveTaskCommand)
export class RemoveTaskCommandHandler extends CommandHandlerBase<
  TaskUnitOfWork,
  void
> {
  constructor(unitOfWork: TaskUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: RemoveTaskCommand,
  ): Promise<Result<void, ExceptionBase>> {
    const {
      trxId,
      payload: { id },
    } = command;

    const taskRepository = this.unitOfWork.getTaskRepository(trxId);

    return taskRepository.remove(new UuidVO(id));
  }
}
