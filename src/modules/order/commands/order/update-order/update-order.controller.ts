import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { OrderEntity } from '@modules/order/domain';
import { OrderResponseDto } from '@modules/order/dtos';
import { Role } from '@modules/staff/types';
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

import { UpdateOrderCommand } from './update-order.command';
import { UpdateOrderRequestDto } from './update-order.request.dto';

@ApiTags('order/order')
@Controller()
export class UpdateOrderController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update order' })
  @ApiOkResponse({ type: () => OrderResponseDto })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER]))
  @Patch(routes.order.byId)
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    const command = new UpdateOrderCommand({ payload: { ...body, id } });

    const result: Result<OrderEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new OrderResponseDto(entity)).unwrap();
  }
}
