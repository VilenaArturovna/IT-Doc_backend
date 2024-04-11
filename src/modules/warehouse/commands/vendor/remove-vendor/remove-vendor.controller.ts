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

import { RemoveVendorCommand } from './remove-vendor.command';

@ApiTags('warehouse/vendor')
@Controller()
export class RemoveVendorController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove vendor' })
  @HttpCode(204)
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER]))
  @Delete(routes.vendor.byId)
  async removeVendor(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const command = new RemoveVendorCommand({ payload: { id } });

    const result: Result<void, ExceptionBase> = await this.commandBus.execute(
      command,
    );

    result.unwrap();
  }
}
