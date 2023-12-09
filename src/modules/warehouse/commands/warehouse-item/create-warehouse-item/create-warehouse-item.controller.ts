import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { WarehouseItemEntity } from '@modules/warehouse/domain';
import { WarehouseItemResponseDto } from '@modules/warehouse/dtos';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateWarehouseItemCommand } from './create-warehouse-item.command';
import { CreateWarehouseItemRequestDto } from './create-warehouse-item.request.dto';

@ApiTags('warehouse/warehouse-item')
@Controller()
export class CreateWarehouseItemController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create warehouse item' })
  @ApiOkResponse({ type: () => WarehouseItemResponseDto })
  @Post(routes.warehouseItem.root)
  async createWarehouseItem(
    @Body() body: CreateWarehouseItemRequestDto,
  ): Promise<WarehouseItemResponseDto> {
    const command = new CreateWarehouseItemCommand({ payload: body });

    const result: Result<WarehouseItemEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result
      .mapValue((entity) => new WarehouseItemResponseDto(entity))
      .unwrap();
  }
}
