import { Controller, Get, Query } from '@nestjs/common';
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
import { GetManyClientsQuery } from '@modules/order/queries';
import { GetManyClientsDaoModel } from '@modules/order/database/read-model';
import { GetManyClientsRequestDto } from './get-many-clients.request.dto';

@ApiTags('order/client')
@Controller()
export class GetManyClientsController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get many clients' })
  @ApiOkResponse({ type: () => GetManyClientsDaoModel })
  @Get(routes.client.root)
  async getManyClients(
    @Query() params: GetManyClientsRequestDto,
  ): Promise<GetManyClientsDaoModel> {
    const query = new GetManyClientsQuery({ params });

    const result: Result<GetManyClientsDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
