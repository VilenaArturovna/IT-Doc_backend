import { Module } from '@nestjs/common';
import { commandControllers, commandHandlers } from '@modules/order/commands';
import { CqrsModule } from '@nestjs/cqrs';
import { readDaoProviders, repositories } from '@modules/order/database';
import { queryControllers, queryHandlers } from '@modules/order/queries';

@Module({
  controllers: [...commandControllers, ...queryControllers],
  providers: [
    ...commandHandlers,
    ...repositories,
    ...queryHandlers,
    ...readDaoProviders,
  ],
  imports: [CqrsModule],
})
export class OrderModule {}
