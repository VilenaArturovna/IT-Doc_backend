import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { TelegramBotService } from '@modules/telegram/service';
import { QueryHandler } from '@nestjs/cqrs';

import { SetWebhookQuery } from './set-webhook.query';

@QueryHandler(SetWebhookQuery)
export class SetWebhookQueryHandler {
  constructor(private readonly telegramService: TelegramBotService) {}

  async execute(query: SetWebhookQuery): Promise<Result<void, ExceptionBase>> {
    const { domain } = query.params;

    return this.telegramService.setWebhook(domain);
  }
}
