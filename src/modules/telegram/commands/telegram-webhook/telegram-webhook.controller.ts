import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { TelegramController } from '@modules/telegram/queries/constants';
import { Body, HttpCode, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from '@src/common';

import { TelegramWebhookCommand } from './telegram-webhook.command';
import { TelegramWebhookRequestDto } from './telegram-webhook.request.dto';

@TelegramController()
export class TelegramWebhookController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @ApiOperation({ summary: 'Telegram webhook' })
  @HttpCode(200)
  @Post(routes.telegram.updates)
  async telegramWebhook(@Body() body: any): Promise<void> {
    const command = new TelegramWebhookCommand({
      payload: body as TelegramWebhookRequestDto,
    });

    const result: Result<void, ExceptionBase> = await this.commandBus.execute(
      command,
    );

    result?.unwrap();
  }
}
