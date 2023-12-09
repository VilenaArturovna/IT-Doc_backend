import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { GetOneClientDaoModel } from '@modules/order/database/read-model';
import { GetOneClientQuery } from '@modules/order/queries';
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

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
