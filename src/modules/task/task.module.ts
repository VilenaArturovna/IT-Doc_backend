import { StaffModule } from '@modules/staff/staff.module';
import { commandControllers, commandHandlers } from '@modules/task/commands';
import { readDaoProviders } from '@modules/task/database';
import { TaskUnitOfWork } from '@modules/task/database/unit-of-work';
import { queryControllers, queryHandlers } from '@modules/task/queries';
import { TelegramModule } from '@modules/telegram/telegram.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, StaffModule, TelegramModule],
  controllers: [...commandControllers, ...queryControllers],
  providers: [
    TaskUnitOfWork,
    ...commandHandlers,
    ...readDaoProviders,
    ...queryHandlers,
  ],
})
export class TaskModule {}
