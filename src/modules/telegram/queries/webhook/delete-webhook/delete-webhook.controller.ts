import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { DeleteWebhookQuery } from '@modules/telegram/queries';
import { TelegramController } from '@modules/telegram/queries/constants';
import { Delete, HttpCode } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from '@src/common';

@TelegramController()
export class DeleteWebhookController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @ApiOperation({ summary: 'Delete webhook' })
  @HttpCode(204)
  @Delete(routes.telegram.webhook)
  async deleteWebhook(): Promise<void> {
    const query = new DeleteWebhookQuery({});

    const result: Result<void, ExceptionBase> = await this.queryBus.execute(
      query,
    );

    result.unwrap();
  }
}
