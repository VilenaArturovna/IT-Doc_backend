import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { ClientEntity } from '@modules/order/domain';
import { ClientResponseDto } from '@modules/order/dtos';
import { Role } from '@modules/staff/types';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateClientCommand } from './create-client.command';
import { CreateClientRequestDto } from './create-client.request.dto';

@ApiTags('order/client')
@Controller()
export class CreateClientController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create client' })
  @ApiOkResponse({ type: () => ClientResponseDto })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER, Role.ENGINEER]))
  @Post(routes.client.root)
  async createClient(
    @Body() body: CreateClientRequestDto,
  ): Promise<ClientResponseDto> {
    const command = new CreateClientCommand({ payload: body });

    const result: Result<ClientEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new ClientResponseDto(entity)).unwrap();
  }
}
