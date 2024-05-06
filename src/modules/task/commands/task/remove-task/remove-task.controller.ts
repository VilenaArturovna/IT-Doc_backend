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

import { RemoveTaskCommand } from './remove-task.command';

@ApiTags('task/task')
@Controller()
export class RemoveTaskController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove task' })
  @HttpCode(204)
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER]))
  @Delete(routes.task.byId)
  async removeTask(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const command = new RemoveTaskCommand({ payload: { id } });

    const result: Result<void, ExceptionBase> = await this.commandBus.execute(
      command,
    );

    return result.unwrap();
  }
}
