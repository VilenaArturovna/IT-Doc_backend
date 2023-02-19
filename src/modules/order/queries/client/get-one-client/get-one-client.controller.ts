import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Result } from '@libs/utils';
import { routes } from '@libs/routes';
import { ExceptionBase } from '@libs/base-classes';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetOneClientQuery } from '@modules/order/queries';
import { GetOneClientDaoModel } from '@modules/order/database/read-model';

@ApiTags('order/client')
@Controller()
export class GetOneClientController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one client' })
  @ApiOkResponse({ type: () => GetOneClientDaoModel })
  @Get(routes.client.byId)
  async getOneClient(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetOneClientDaoModel> {
    const query = new GetOneClientQuery({ params: { id } });

    const result: Result<GetOneClientDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
