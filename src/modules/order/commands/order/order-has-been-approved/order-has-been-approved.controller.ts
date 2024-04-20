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

import { OrderHasBeenApprovedCommand } from './order-has-been-approved.command';
import { OrderHasBeenApprovedRequestDto } from './order-has-been-approved.request.dto';

@ApiTags('order/order')
@Controller()
export class OrderHasBeenApprovedController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Order has been approved' })
  @ApiOkResponse({ type: () => OrderResponseDto })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER]))
  @Patch(routes.order.approved)
  async orderHasBeenApproved(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: OrderHasBeenApprovedRequestDto,
  ): Promise<OrderResponseDto> {
    const command = new OrderHasBeenApprovedCommand({
      payload: { ...body, id },
    });

    const result: Result<OrderEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new OrderResponseDto(entity)).unwrap();
  }
}
