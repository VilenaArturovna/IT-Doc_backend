import { Body, Controller, Post } from '@nestjs/common';
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
import { CreateOrderCommand } from './create-order.command';
import { CreateOrderRequestDto } from './create-order.request.dto';
import { OrderResponseDto } from '@modules/order/dtos';
import { OrderEntity } from '@modules/order/domain';

@ApiTags('order/order')
@Controller()
export class CreateOrderController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create order' })
  @ApiOkResponse({ type: () => OrderResponseDto })
  @Post(routes.order.root)
  async createOrder(
    @Body() body: CreateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    const command = new CreateOrderCommand({ payload: body });

    const result: Result<OrderEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new OrderResponseDto(entity)).unwrap();
  }
}
