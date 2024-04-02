import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { OrderEntity } from '@modules/order/domain';
import { OrderResponseDto } from '@modules/order/dtos';
import { Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { TakeOrderToWorkCommand } from './take-order-to-work.command';

@ApiTags('order/order')
@Controller()
export class TakeOrderToWorkController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Take order to work' })
  @ApiOkResponse({ type: () => OrderResponseDto })
  @Patch(routes.order.takeToWork)
  async takeOrderToWork(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<OrderResponseDto> {
    const command = new TakeOrderToWorkCommand({ payload: { id } });

    const result: Result<OrderEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new OrderResponseDto(entity)).unwrap();
  }
}
