import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { SetWebhookQuery } from '@modules/telegram/queries';
import { TelegramController } from '@modules/telegram/queries/constants';
import { Body, HttpCode, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from '@src/common';

import { SetWebhookRequestDto } from './set-webhook.request.dto';

@TelegramController()
export class SetWebhookController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @ApiOperation({ summary: 'Set webhook' })
  @HttpCode(204)
  @Post(routes.telegram.webhook)
  async setWebhook(@Body() body: SetWebhookRequestDto): Promise<void> {
    const query = new SetWebhookQuery({ params: body });

    const result: Result<void, ExceptionBase> = await this.queryBus.execute(
      query,
    );

    result.unwrap();
  }
}
