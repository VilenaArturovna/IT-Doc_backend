import {
  commandControllers,
  commandHandlers,
} from '@modules/warehouse/commands';
import { readDaoProviders } from '@modules/warehouse/database';
import { WarehouseUnitOfWork } from '@modules/warehouse/database/unit-of-work';
import { queryControllers, queryHandlers } from '@modules/warehouse/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

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
