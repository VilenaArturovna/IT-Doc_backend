import { commandControllers, commandHandlers } from '@modules/order/commands';
import { readDaoProviders } from '@modules/order/database';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';
import { queryControllers, queryHandlers } from '@modules/order/queries';
import { InformAboutApproachingDeadlineCronService } from '@modules/order/services/cron';
import { StaffModule } from '@modules/staff/staff.module';
import { TelegramModule } from '@modules/telegram/telegram.module';
import { WarehouseModule } from '@modules/warehouse/warehouse.module';
import { forwardRef, Module } from '@nestjs/common';
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
    InformAboutApproachingDeadlineCronService,
    //telegramBotSingletonProvider,
  ],
  imports: [
    CqrsModule,
    StaffModule,
    WarehouseModule,
    forwardRef(() => TelegramModule),
  ],
})
export class OrderModule {}
