import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { GetOneWarehouseItemDaoModel } from '@modules/warehouse/database/read-model';
import { GetOneWarehouseItemQuery } from '@modules/warehouse/queries';
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('warehouse/warehouse-item')
@Controller()
export class GetOneWarehouseItemController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one warehouse item' })
  @ApiOkResponse({ type: () => GetOneWarehouseItemDaoModel })
  @Get(routes.warehouseItem.byId)
  async getOneWarehouseItem(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetOneWarehouseItemDaoModel> {
    const query = new GetOneWarehouseItemQuery({ params: { id } });

    const result: Result<GetOneWarehouseItemDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
