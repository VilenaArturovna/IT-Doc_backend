import { TaskUnitOfWork } from '@modules/task/database';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [],
  providers: [TaskUnitOfWork],
})
export class TaskModule {}
