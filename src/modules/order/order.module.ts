import { Module } from '@nestjs/common';
import { commandControllers, commandHandlers } from '@modules/order/commands';
import { CqrsModule } from '@nestjs/cqrs';
import { readDaoProviders } from '@modules/order/database';
import { queryControllers, queryHandlers } from '@modules/order/queries';
import { StaffModule } from '@modules/staff/staff.module';
import { WarehouseModule } from '@modules/warehouse/warehouse.module';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';

@Module({
  controllers: [...commandControllers, ...queryControllers],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...readDaoProviders,
    OrderUnitOfWork,
  ],
  imports: [CqrsModule, StaffModule, WarehouseModule],
})
export class OrderModule {}
