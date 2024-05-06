import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Role } from '@modules/staff/types';
import { TaskEntity } from '@modules/task/domain';
import { TaskResponseDto } from '@modules/task/dtos';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MyId } from '@src/common';

import { CreateTaskCommand } from './create-task.command';
import { CreateTaskRequestDto } from './create-task.request.dto';

@ApiTags('task/task')
@Controller()
export class CreateTaskController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create task' })
  @ApiOkResponse({ type: () => TaskResponseDto })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER]))
  @Post(routes.task.root)
  async createTask(
    @Body() body: CreateTaskRequestDto,
    @MyId() authorId: string,
  ): Promise<TaskResponseDto> {
    const command = new CreateTaskCommand({ payload: { ...body, authorId } });

    const result: Result<TaskEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new TaskResponseDto(entity)).unwrap();
  }
}
