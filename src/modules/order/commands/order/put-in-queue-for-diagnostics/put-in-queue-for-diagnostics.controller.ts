import { Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
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
import { PutInQueueForDiagnosticsCommand } from './put-in-queue-for-diagnostics.command';
import { PutInQueueForDiagnosticsRequestDto } from './put-in-queue-for-diagnostics.request.dto';
import { OrderResponseDto } from '@modules/order/dtos';
import { OrderEntity } from '@modules/order/domain';

@ApiTags('order/order')
@Controller()
export class PutInQueueForDiagnosticsController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Put in queue for diagnostics' })
  @ApiOkResponse({ type: () => OrderResponseDto })
  @Patch(routes.order.putInQueueForDiagnostics)
  async putInQueueForDiagnostics(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<OrderResponseDto> {
    const command = new PutInQueueForDiagnosticsCommand({ payload: { id } });

    const result: Result<OrderEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new OrderResponseDto(entity)).unwrap();
  }
}
