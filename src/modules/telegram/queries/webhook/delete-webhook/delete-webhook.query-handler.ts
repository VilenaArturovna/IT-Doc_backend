import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { TelegramBotService } from '@modules/telegram/service';
import { QueryHandler } from '@nestjs/cqrs';

import { DeleteWebhookQuery } from './delete-webhook.query';

@QueryHandler(DeleteWebhookQuery)
export class DeleteWebhookQueryHandler {
  constructor(private readonly telegramService: TelegramBotService) {}

  async execute(): Promise<Result<void, ExceptionBase>> {
    return this.telegramService.deleteWebhook();
  }
}
