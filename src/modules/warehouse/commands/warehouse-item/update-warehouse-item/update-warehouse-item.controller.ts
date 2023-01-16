import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateWarehouseItemCommand } from './update-warehouse-item.command';
import { UpdateWarehouseItemRequestDto } from './update-warehouse-item.request.dto';
import { WarehouseItemResponseDto } from '@modules/warehouse/dtos';
import { WarehouseItemEntity } from '@modules/warehouse/domain';

@ApiTags('warehouse/warehouse-item')
@Controller()
export class UpdateWarehouseItemController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update warehouse item' })
  @ApiOkResponse({ type: () => WarehouseItemResponseDto })
  @Patch(routes.warehouseItem.byId)
  async updateWarehouseItem(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateWarehouseItemRequestDto,
  ): Promise<WarehouseItemResponseDto> {
    const command = new UpdateWarehouseItemCommand({
      payload: { ...body, id },
    });

    const result: Result<WarehouseItemEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result
      .mapValue((entity) => new WarehouseItemResponseDto(entity))
      .unwrap();
  }
}
