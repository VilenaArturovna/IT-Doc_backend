import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Role } from '@modules/staff/types';
import { GetManyTasksDaoModel } from '@modules/task/database/read-model';
import { GetManyTasksQuery } from '@modules/task/queries';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MyId } from '@src/common';

import { GetManyTasksRequestDto } from './get-many-tasks.request.dto';

@ApiTags('task/task')
@Controller()
export class GetManyTasksController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get many tasks' })
  @ApiOkResponse({ type: () => GetManyTasksDaoModel })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER, Role.ENGINEER]))
  @ApiExtraModels(GetManyTasksRequestDto)
  @Get(routes.task.root)
  async getManyTasks(
    @Query() params: GetManyTasksRequestDto,
    @MyId() staffId: string,
  ): Promise<GetManyTasksDaoModel> {
    const query = new GetManyTasksQuery({
      params: { ...params, staffId },
    });

    const result: Result<GetManyTasksDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
