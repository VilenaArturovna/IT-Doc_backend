import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { UuidVO } from '@libs/value-objects';
import { TaskUnitOfWork } from '@modules/task/database/unit-of-work';
import { TaskEntity } from '@modules/task/domain';
import { CommandHandler } from '@nestjs/cqrs';

import { MarkTaskAsReadCommand } from './mark-task-as-read.command';

@CommandHandler(MarkTaskAsReadCommand)
export class MarkTaskAsReadCommandHandler extends CommandHandlerBase<
  TaskUnitOfWork,
  TaskEntity
> {
  constructor(unitOfWork: TaskUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: MarkTaskAsReadCommand,
  ): Promise<Result<TaskEntity, ExceptionBase>> {
    const {
      trxId,
      payload: { id, staffId },
    } = command;

    const taskRepository = this.unitOfWork.getTaskRepository(trxId);

    const taskResult = await taskRepository.getOneById(new UuidVO(id));
    const task = taskResult.unwrap();

    task.markAsRead(new UuidVO(staffId));

    return taskRepository.update(task);
  }
}
