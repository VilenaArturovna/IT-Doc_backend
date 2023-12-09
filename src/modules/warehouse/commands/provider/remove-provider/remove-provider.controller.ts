import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RemoveProviderCommand } from './remove-provider.command';

@ApiTags('warehouse/provider')
@Controller()
export class RemoveProviderController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove provider' })
  @HttpCode(204)
  @Delete(routes.provider.byId)
  async removeProvider(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const command = new RemoveProviderCommand({ payload: { id } });

    const result: Result<void, ExceptionBase> = await this.commandBus.execute(
      command,
    );

    result.unwrap();
  }
}
