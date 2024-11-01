import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { Currency, DateVO, MoneyVO, UuidVO } from '@libs/value-objects';
import { StaffEntity } from '@modules/staff/domain';
import { Role } from '@modules/staff/types';
import { TaskUnitOfWork } from '@modules/task/database/unit-of-work';
import { TaskEntity, TaskStaffEntity } from '@modules/task/domain';
import { TelegramBotService } from '@modules/telegram/service';
import { CommandHandler } from '@nestjs/cqrs';

import { CreateTaskCommand } from './create-task.command';

@CommandHandler(CreateTaskCommand)
export class CreateTaskCommandHandler extends CommandHandlerBase<
  TaskUnitOfWork,
  TaskEntity
> {
  constructor(
    unitOfWork: TaskUnitOfWork,
    private readonly telegramBotService: TelegramBotService,
  ) {
    super(unitOfWork);
  }

  async handle(
    command: CreateTaskCommand,
  ): Promise<Result<TaskEntity, ExceptionBase>> {
    const { trxId, payload } = command;

    const taskRepository = this.unitOfWork.getTaskRepository(trxId);
    const staffRepository = this.unitOfWork.getStaffRepository(trxId);

    const authorResult = await staffRepository.getOneById(
      new UuidVO(payload.authorId),
    );
    const author = authorResult.unwrap();

    let responsibleStaff: StaffEntity;

    if (
      payload.responsibleStaffId &&
      payload.responsibleStaffId !== payload.authorId
    ) {
      const staffResult = await staffRepository.getOneById(
        new UuidVO(payload.responsibleStaffId),
      );
      responsibleStaff = staffResult.unwrap();
    }

    const task = TaskEntity.create({
      theme: payload.theme,
      description: payload.description,
      deadline: payload.deadline ? new DateVO(payload.deadline) : undefined,
      price: payload.price
        ? new MoneyVO({ currency: Currency.RUB, amount: payload.price })
        : undefined,
      participants: [
        TaskStaffEntity.create({
          staff: author,
          isResponsible: payload.authorId === payload.responsibleStaffId,
          isAuthor: true,
        }),
      ],
    });

    if (payload.authorId === payload.responsibleStaffId) {
      return taskRepository.create(task);
    }

    const participants: TaskStaffEntity[] = [];

    if (responsibleStaff) {
      participants.push(
        TaskStaffEntity.create({
          staff: responsibleStaff,
          isAuthor: false,
          isResponsible: true,
        }),
      );
    } else {
      const staffResult = await staffRepository.getManyByRole(Role.ENGINEER);
      const staff = staffResult.unwrap();

      for (const st of staff) {
        participants.push(
          TaskStaffEntity.create({
            staff: st,
            isAuthor: false,
            isResponsible: false,
          }),
        );
      }
    }

    task.addParticipants(participants);

    const newTaskResult = await taskRepository.create(task);
    const newTask = newTaskResult.unwrap();

    const res = await this.telegramBotService.newTaskHasBeenAssigned({
      taskId: newTask.id.value,
      tgIds: participants.map((p) => p.staffTgId),
    });

    if (!res.isErr) {
      await this.telegramBotService.taskCreated(author.tgId);
    }

    return newTaskResult;
  }
}
