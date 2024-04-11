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

import { OrderHasBeenDiagnosedCommand } from './order-has-been-diagnosed.command';
import { OrderHasBeenDiagnosedRequestDto } from './order-has-been-diagnosed.request.dto';

@ApiTags('order/order')
@Controller()
export class OrderHasBeenDiagnosedController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Order has been diagnosed' })
  @ApiOkResponse({ type: () => OrderResponseDto })
  @UseGuards(RoleGuard([Role.ADMIN, Role.ENGINEER]))
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
