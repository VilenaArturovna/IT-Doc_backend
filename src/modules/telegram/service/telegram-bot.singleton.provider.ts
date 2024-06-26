import { TelegramBotService } from '@modules/telegram/service/telegram-bot.service';
import { ConfigService } from '@nestjs/config';

export const telegramBotSingletonProvider = {
  provide: TelegramBotService,
  useFactory: (configService: ConfigService) =>
    new TelegramBotService(configService),
  inject: [ConfigService],
};
