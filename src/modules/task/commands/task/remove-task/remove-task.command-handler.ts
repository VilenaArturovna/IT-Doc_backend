import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { ConflictException } from '@libs/exceptions';
import { Result } from '@libs/utils';
import { UuidVO } from '@libs/value-objects';
import { TaskUnitOfWork } from '@modules/task/database/unit-of-work';
import { TaskStatus } from '@modules/task/types';
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

    const taskResult = await taskRepository.getOneById(new UuidVO(id));
    const task = taskResult.unwrap();

    if (task.status === TaskStatus.COMPLETED) {
      return Result.fail(
        new ConflictException('Нельзя удалить выполненную задачу'),
      );
    }

    return taskRepository.remove(new UuidVO(id));
  }
}
