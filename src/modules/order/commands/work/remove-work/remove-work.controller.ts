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

import { RemoveWorkCommand } from './remove-work.command';

@ApiTags('order/work')
@Controller()
export class RemoveWorkController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove work' })
  @HttpCode(204)
  @UseGuards(RoleGuard([Role.ADMIN]))
  @Delete(routes.work.byId)
  async removeWork(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const command = new RemoveWorkCommand({ payload: { id } });

    const result: Result<void, ExceptionBase> = await this.commandBus.execute(
      command,
    );

    result.unwrap();
  }
}
