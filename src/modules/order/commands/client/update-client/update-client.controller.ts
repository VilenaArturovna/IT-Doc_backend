import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { ClientEntity } from '@modules/order/domain';
import { ClientResponseDto } from '@modules/order/dtos';
import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UpdateClientCommand } from './update-client.command';
import { UpdateClientRequestDto } from './update-client.request.dto';

@ApiTags('order/client')
@Controller()
export class UpdateClientController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update client' })
  @ApiOkResponse({ type: () => ClientResponseDto })
  @Patch(routes.client.byId)
  async updateClient(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateClientRequestDto,
  ): Promise<ClientResponseDto> {
    const command = new UpdateClientCommand({ payload: { ...body, id } });

    const result: Result<ClientEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new ClientResponseDto(entity)).unwrap();
  }
}
