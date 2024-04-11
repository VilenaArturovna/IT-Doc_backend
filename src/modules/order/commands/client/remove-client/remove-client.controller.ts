import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Role } from '@modules/staff/types';
import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RemoveClientCommand } from './remove-client.command';

@ApiTags('order/client')
@Controller()
export class RemoveClientController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove client' })
  @HttpCode(204)
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER, Role.ENGINEER]))
  @Delete(routes.client.byId)
  async removeClient(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const command = new RemoveClientCommand({ payload: { id } });

    const result: Result<void, ExceptionBase> = await this.commandBus.execute(
      command,
    );

    result.unwrap();
  }
}
