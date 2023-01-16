import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  commandControllers,
  commandHandlers,
} from '@modules/warehouse/commands';
import { readDaoProviders, repositories } from '@modules/warehouse/database';
import { queryControllers, queryHandlers } from '@modules/warehouse/queries';

@Module({
  imports: [CqrsModule],
  controllers: [...commandControllers, ...queryControllers],
  providers: [
    ...commandHandlers,
    ...repositories,
    ...readDaoProviders,
    ...queryHandlers,
  ],
})
export class WarehouseModule {}
