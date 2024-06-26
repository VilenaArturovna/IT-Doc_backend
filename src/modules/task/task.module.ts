import { StaffModule } from '@modules/staff/staff.module';
import { commandControllers, commandHandlers } from '@modules/task/commands';
import { readDaoProviders } from '@modules/task/database';
import { TaskUnitOfWork } from '@modules/task/database/unit-of-work';
import { queryControllers, queryHandlers } from '@modules/task/queries';
import { telegramBotSingletonProvider } from '@modules/telegram/service/telegram-bot.singleton.provider';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, StaffModule],
  controllers: [...commandControllers, ...queryControllers],
  providers: [
    TaskUnitOfWork,
    ...commandHandlers,
    ...readDaoProviders,
    ...queryHandlers,
    telegramBotSingletonProvider,
  ],
})
export class TaskModule {}
