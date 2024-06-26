import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { TelegramUnitOfWork } from '@modules/telegram/database/unit-of-work';
import { TelegramBotService } from '@modules/telegram/service';
import { CommandHandler } from '@nestjs/cqrs';

import { TelegramWebhookCommand } from './telegram-webhook.command';

@CommandHandler(TelegramWebhookCommand)
export class TelegramWebhookCommandHandler extends CommandHandlerBase<
  TelegramUnitOfWork,
  void
> {
  constructor(
    private readonly telegramBotService: TelegramBotService,
    protected readonly unitOfWork: TelegramUnitOfWork,
  ) {
    super(unitOfWork);
  }

  async handle(
    command: TelegramWebhookCommand,
  ): Promise<Result<void, ExceptionBase>> {
    if (!command.payload.callback_query) return Result.ok();

    return Result.ok();
  }
}
