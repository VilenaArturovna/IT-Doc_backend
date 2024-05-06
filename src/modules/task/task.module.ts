import { StaffModule } from '@modules/staff/staff.module';
import { commandControllers, commandHandlers } from '@modules/task/commands';
import { readDaoProviders } from '@modules/task/database';
import { TaskUnitOfWork } from '@modules/task/database/unit-of-work';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, StaffModule],
  controllers: [...commandControllers],
  providers: [TaskUnitOfWork, ...commandHandlers, ...readDaoProviders],
})
export class TaskModule {}
