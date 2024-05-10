import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Role } from '@modules/staff/types';
import { TaskEntity } from '@modules/task/domain';
import { TaskResponseDto } from '@modules/task/dtos';
import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MyId } from '@src/common';

import { UpdateTaskCommand } from './update-task.command';
import { UpdateTaskRequestDto } from './update-task.request.dto';

@ApiTags('task/task')
@Controller()
export class UpdateTaskController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update task' })
  @ApiOkResponse({ type: () => TaskResponseDto })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER]))
  @Patch(routes.task.byId)
  async updateTask(
    @Param('id') id: string,
    @MyId() staffId: string,
    @Body() body: UpdateTaskRequestDto,
  ): Promise<TaskResponseDto> {
    const command = new UpdateTaskCommand({
      payload: { ...body, id, staffId },
    });

    const result: Result<TaskEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new TaskResponseDto(entity)).unwrap();
  }
}
