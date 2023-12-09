import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { GetManyWarehouseItemsDaoModel } from '@modules/warehouse/database/read-model';
import { GetManyWarehouseItemsQuery } from '@modules/warehouse/queries';
import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GetManyWarehouseItemsRequestDto } from './get-many-warehouse-items.request.dto';

@ApiTags('warehouse/warehouse-item')
@Controller()
export class GetManyWarehouseItemsController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get many warehouse items' })
  @ApiOkResponse({ type: () => GetManyWarehouseItemsDaoModel })
  @Get(routes.warehouseItem.root)
  async getManyWarehouseItems(
    @Query() params: GetManyWarehouseItemsRequestDto,
  ): Promise<GetManyWarehouseItemsDaoModel> {
    const query = new GetManyWarehouseItemsQuery({ params });

    const result: Result<GetManyWarehouseItemsDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
