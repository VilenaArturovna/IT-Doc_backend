import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Role } from '@modules/staff/types';
import { GetOneWarehouseItemDaoModel } from '@modules/warehouse/database/read-model';
import { GetOneWarehouseItemQuery } from '@modules/warehouse/queries';
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
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
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER, Role.ENGINEER]))
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
