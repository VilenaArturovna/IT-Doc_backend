import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  commandControllers,
  commandHandlers,
} from '@modules/warehouse/commands';
import { readDaoProviders } from '@modules/warehouse/database';
import { queryControllers, queryHandlers } from '@modules/warehouse/queries';
import { WarehouseUnitOfWork } from '@modules/warehouse/database/unit-of-work';

@Module({
  imports: [CqrsModule],
  controllers: [...commandControllers, ...queryControllers],
  providers: [
    ...commandHandlers,
    ...readDaoProviders,
    ...queryHandlers,
    WarehouseUnitOfWork,
  ],
})
export class WarehouseModule {}
