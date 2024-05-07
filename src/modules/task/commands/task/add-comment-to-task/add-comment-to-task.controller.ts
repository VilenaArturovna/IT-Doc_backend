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

import { AddCommentToTaskCommand } from './add-comment-to-task.command';
import { AddCommentToTaskRequestDto } from './add-comment-to-task.request.dto';

@ApiTags('task/task')
@Controller()
export class AddCommentToTaskController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add comment to task' })
  @ApiOkResponse({ type: () => TaskResponseDto })
  @UseGuards(RoleGuard([Role.ADMIN, Role.ENGINEER, Role.MANAGER]))
  @Patch(routes.task.addComment)
  async addCommentToTask(
    @Body() body: AddCommentToTaskRequestDto,
    @MyId() staffId: string,
    @Param('id') id: string,
  ): Promise<TaskResponseDto> {
    const command = new AddCommentToTaskCommand({
      payload: { ...body, staffId, id },
    });

    const result: Result<TaskEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new TaskResponseDto(entity)).unwrap();
  }
}
