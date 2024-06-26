import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { GetWebhookInfoQuery } from '@modules/telegram/queries';
import { TelegramController } from '@modules/telegram/queries/constants';
import { Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Public } from '@src/common';

@TelegramController()
export class GetWebhookInfoController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @ApiOperation({ summary: 'Get webhook info' })
  @ApiOkResponse({ type: String })
  @Get(routes.telegram.webhook)
  async getWebhookInfo(): Promise<string> {
    const query = new GetWebhookInfoQuery({});

    const result: Result<string, ExceptionBase> = await this.queryBus.execute(
      query,
    );

    return result.unwrap();
  }
}
