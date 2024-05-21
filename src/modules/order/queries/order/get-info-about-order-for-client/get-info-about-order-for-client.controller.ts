import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { GetInfoAboutOrderForClientDaoModel } from '@modules/order/database/read-model';
import { GetInfoAboutOrderForClientQuery } from '@modules/order/queries';
import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '@src/common';

import { GetInfoAboutOrderForClientRequestDto } from './get-info-about-order-for-client.request.dto';

@ApiTags('order/order')
@Controller()
export class GetInfoAboutOrderForClientController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @ApiOperation({ summary: 'Get info about order for client' })
  @ApiOkResponse({ type: () => GetInfoAboutOrderForClientDaoModel })
  @ApiExtraModels(GetInfoAboutOrderForClientRequestDto)
  @Get(routes.order.infoForClient)
  async getInfoAboutOrderForClient(
    @Query() params: GetInfoAboutOrderForClientRequestDto,
  ): Promise<GetInfoAboutOrderForClientDaoModel> {
    const query = new GetInfoAboutOrderForClientQuery({
      params: { ...params },
    });

    const result: Result<GetInfoAboutOrderForClientDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
