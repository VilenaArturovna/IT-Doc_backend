import { OrderModule } from '@modules/order/order.module';
import {
  TelegramWebhookCommandHandler,
  TelegramWebhookController,
} from '@modules/telegram/commands';
import { TelegramUnitOfWork } from '@modules/telegram/database/unit-of-work';
import { queriesControllers, queryHandlers } from '@modules/telegram/queries';
import { telegramBotSingletonProvider } from '@modules/telegram/service/telegram-bot.singleton.provider';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  providers: [
    TelegramWebhookCommandHandler,
    ...queryHandlers,
    telegramBotSingletonProvider,
    TelegramUnitOfWork,
  ],
  controllers: [TelegramWebhookController, ...queriesControllers],
  imports: [CqrsModule, OrderModule],
})
export class TelegramModule {}
