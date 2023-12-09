import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { WarehouseItemEntity } from '@modules/warehouse/domain';
import { WarehouseItemResponseDto } from '@modules/warehouse/dtos';
import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ArchiveWarehouseItemCommand } from './archive-warehouse-item.command';

@ApiTags('warehouse/warehouse-item')
@Controller()
export class ArchiveWarehouseItemController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Archive warehouse item' })
  @ApiOkResponse({ type: () => WarehouseItemResponseDto })
  @Delete(routes.warehouseItem.byId)
  async archiveWarehouseItem(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<WarehouseItemResponseDto> {
    const command = new ArchiveWarehouseItemCommand({ payload: { id } });

    const result: Result<WarehouseItemEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result
      .mapValue((entity) => new WarehouseItemResponseDto(entity))
      .unwrap();
  }
}
