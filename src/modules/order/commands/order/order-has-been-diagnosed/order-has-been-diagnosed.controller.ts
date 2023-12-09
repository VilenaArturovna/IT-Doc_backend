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
import { OrderHasBeenDiagnosedCommand } from './order-has-been-diagnosed.command';
import { OrderHasBeenDiagnosedRequestDto } from './order-has-been-diagnosed.request.dto';
import { OrderResponseDto } from '@modules/order/dtos';
import { OrderEntity } from '@modules/order/domain';

@ApiTags('order/order')
@Controller()
export class OrderHasBeenDiagnosedController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Order has been diagnosed' })
  @ApiOkResponse({ type: () => OrderResponseDto })
  @Patch(routes.order.diagnosed)
  async orderHasBeenDiagnosed(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: OrderHasBeenDiagnosedRequestDto,
  ): Promise<OrderResponseDto> {
    const command = new OrderHasBeenDiagnosedCommand({
      payload: { ...body, id },
    });

    const result: Result<OrderEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new OrderResponseDto(entity)).unwrap();
  }
}
