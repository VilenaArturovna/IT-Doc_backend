import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { UuidVO } from '@libs/value-objects';
import { TaskUnitOfWork } from '@modules/task/database/unit-of-work';
import { TaskEntity } from '@modules/task/domain';
import { CommandHandler } from '@nestjs/cqrs';

import { AddCommentToTaskCommand } from './add-comment-to-task.command';

@CommandHandler(AddCommentToTaskCommand)
export class AddCommentToTaskCommandHandler extends CommandHandlerBase<
  TaskUnitOfWork,
  TaskEntity
> {
  constructor(unitOfWork: TaskUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: AddCommentToTaskCommand,
  ): Promise<Result<TaskEntity, ExceptionBase>> {
    const {
      trxId,
      payload: { comment, staffId, id },
    } = command;

    const taskRepository = this.unitOfWork.getTaskRepository(trxId);

    const taskResult = await taskRepository.getOneById(new UuidVO(id));
    const task = taskResult.unwrap();

    task.addComment(comment, new UuidVO(staffId));

    return taskRepository.update(task);
  }
}
