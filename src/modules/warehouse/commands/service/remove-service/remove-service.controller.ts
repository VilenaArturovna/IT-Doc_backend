import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RemoveServiceCommand } from './remove-service.command';

@ApiTags('warehouse/service')
@Controller()
export class RemoveServiceController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove service' })
  @HttpCode(204)
  @Delete(routes.service.byId)
  async removeService(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const command = new RemoveServiceCommand({ payload: { id } });

    const result: Result<void, ExceptionBase> = await this.commandBus.execute(
      command,
    );

    result.unwrap();
  }
}
