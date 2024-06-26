import { commandControllers, commandHandlers } from '@modules/order/commands';
import { readDaoProviders } from '@modules/order/database';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';
import { queryControllers, queryHandlers } from '@modules/order/queries';
import { StaffModule } from '@modules/staff/staff.module';
import { telegramBotSingletonProvider } from '@modules/telegram/service/telegram-bot.singleton.provider';
import { WarehouseModule } from '@modules/warehouse/warehouse.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { htmlToPdfSingletonProvider } from '@src/common/services/html-pdf-service/html-to-pdf.singleton-provider';

@Module({
  controllers: [...commandControllers, ...queryControllers],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...readDaoProviders,
    OrderUnitOfWork,
    htmlToPdfSingletonProvider,
    telegramBotSingletonProvider,
  ],
  imports: [CqrsModule, StaffModule, WarehouseModule],
})
export class OrderModule {}
