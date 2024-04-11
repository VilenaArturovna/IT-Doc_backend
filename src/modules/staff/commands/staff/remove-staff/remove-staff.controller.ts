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

import { RemoveStaffCommand } from './remove-staff.command';

@ApiTags('staff')
@Controller()
export class RemoveStaffController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove staff' })
  @HttpCode(204)
  @UseGuards(RoleGuard([Role.ADMIN]))
  @Delete(routes.staff.byId)
  async removeUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const command = new RemoveStaffCommand({ payload: { id } });

    const result: Result<void, ExceptionBase> = await this.commandBus.execute(
      command,
    );

    result.unwrap();
  }
}
