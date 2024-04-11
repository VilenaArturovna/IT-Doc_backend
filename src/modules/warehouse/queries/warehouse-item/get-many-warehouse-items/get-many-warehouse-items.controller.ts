import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Role } from '@modules/staff/types';
import { GetManyWarehouseItemsDaoModel } from '@modules/warehouse/database/read-model';
import { GetManyWarehouseItemsQuery } from '@modules/warehouse/queries';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
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
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER, Role.ENGINEER]))
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
