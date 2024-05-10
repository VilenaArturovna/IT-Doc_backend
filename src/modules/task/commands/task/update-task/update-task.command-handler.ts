import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { Currency, DateVO, MoneyVO, UuidVO } from '@libs/value-objects';
import { TaskUnitOfWork } from '@modules/task/database/unit-of-work';
import { TaskEntity } from '@modules/task/domain';
import { CommandHandler } from '@nestjs/cqrs';

import { UpdateTaskCommand } from './update-task.command';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskCommandHandler extends CommandHandlerBase<
  TaskUnitOfWork,
  TaskEntity
> {
  constructor(unitOfWork: TaskUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: UpdateTaskCommand,
  ): Promise<Result<TaskEntity, ExceptionBase>> {
    const { trxId, payload } = command;

    const taskRepository = this.unitOfWork.getTaskRepository(trxId);
    const staffRepository = this.unitOfWork.getStaffRepository(trxId);

    const taskResult = await taskRepository.getOneById(new UuidVO(payload.id));
    const task = taskResult.unwrap();

    if (
      payload.responsibleStaffId &&
      task.isChangedResponsibleStaff(new UuidVO(payload.responsibleStaffId))
    ) {
      const responsibleStaffResult = await staffRepository.getOneById(
        new UuidVO(payload.responsibleStaffId),
      );
      const responsibleStaff = responsibleStaffResult.unwrap();

      task.changeResponsibleStaff(responsibleStaff);
    }

    task.update({
      deadline: payload.deadline ? new DateVO(payload.deadline) : undefined,
      price: payload.price
        ? new MoneyVO({ currency: Currency.RUB, amount: payload.price })
        : undefined,
      theme: payload.theme,
      description: payload.description,
    });

    return taskRepository.update(task);
  }
}
