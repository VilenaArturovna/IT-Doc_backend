import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Role } from '@modules/staff/types';
import { TaskEntity } from '@modules/task/domain';
import { TaskResponseDto } from '@modules/task/dtos';
import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MyId } from '@src/common';

import { TakeTaskToWorkCommand } from './take-task-to-work.command';

@ApiTags('task/task')
@Controller()
export class TakeTaskToWorkController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Take task to work' })
  @ApiOkResponse({ type: () => TaskResponseDto })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER, Role.ENGINEER]))
  @Patch(routes.task.byId)
  async takeTaskToWork(
    @Param('id', ParseUUIDPipe) id: string,
    @MyId() staffId: string,
  ): Promise<TaskResponseDto> {
    const command = new TakeTaskToWorkCommand({ payload: { id, staffId } });

    const result: Result<TaskEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new TaskResponseDto(entity)).unwrap();
  }
}
