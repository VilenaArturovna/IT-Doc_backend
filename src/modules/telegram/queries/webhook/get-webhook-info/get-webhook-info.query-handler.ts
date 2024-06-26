import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { TelegramBotService } from '@modules/telegram/service';
import { QueryHandler } from '@nestjs/cqrs';

import { GetWebhookInfoQuery } from './get-webhook-info.query';

@QueryHandler(GetWebhookInfoQuery)
export class GetWebhookInfoQueryHandler {
  constructor(private readonly telegramService: TelegramBotService) {}

  async execute(): Promise<Result<string, ExceptionBase>> {
    return this.telegramService.getWebhookInfo();
  }
}
