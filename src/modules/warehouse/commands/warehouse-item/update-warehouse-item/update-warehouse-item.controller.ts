import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Role } from '@modules/staff/types';
import { WarehouseItemEntity } from '@modules/warehouse/domain';
import { WarehouseItemResponseDto } from '@modules/warehouse/dtos';
import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UpdateWarehouseItemCommand } from './update-warehouse-item.command';
import { UpdateWarehouseItemRequestDto } from './update-warehouse-item.request.dto';

@ApiTags('warehouse/warehouse-item')
@Controller()
export class UpdateWarehouseItemController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update warehouse item' })
  @ApiOkResponse({ type: () => WarehouseItemResponseDto })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER, Role.ENGINEER]))
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
