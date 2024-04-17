import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { OrderEntity } from '@modules/order/domain';
import { OrderResponseDto } from '@modules/order/dtos';
import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
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
