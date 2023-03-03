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
import { StartDiagnosticCommand } from './start-diagnostic.command';
import { OrderResponseDto } from '@modules/order/dtos';
import { OrderEntity } from '@modules/order/domain';

@ApiTags('order/order')
@Controller()
export class StartDiagnosticController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Start diagnostic' })
  @ApiOkResponse({ type: () => OrderResponseDto })
  @Patch(routes.order.startDiagnostic)
  async startDiagnostic(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<OrderResponseDto> {
    const command = new StartDiagnosticCommand({ payload: { id } });

    const result: Result<OrderEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new OrderResponseDto(entity)).unwrap();
  }
}
