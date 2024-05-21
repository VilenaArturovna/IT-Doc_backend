import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { GetManyOrdersDaoModel } from '@modules/order/database/read-model';
import { GetManyOrdersQuery } from '@modules/order/queries';
import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GetManyOrdersRequestDto } from './get-many-orders.request.dto';

@ApiTags('order/order')
@Controller()
export class GetManyOrdersController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get many orders' })
  @ApiOkResponse({ type: () => GetManyOrdersDaoModel })
  @ApiExtraModels(GetManyOrdersRequestDto)
  @Get(routes.order.root)
  async getManyOrders(
    @Query() params: GetManyOrdersRequestDto,
  ): Promise<GetManyOrdersDaoModel> {
    const query = new GetManyOrdersQuery({ params });

    const result: Result<GetManyOrdersDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
