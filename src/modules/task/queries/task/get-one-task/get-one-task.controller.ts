import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Role } from '@modules/staff/types';
import { GetOneTaskDaoModel } from '@modules/task/database/read-model';
import { GetOneTaskQuery } from '@modules/task/queries';
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MyId } from '@src/common';

@ApiTags('task/task')
@Controller()
export class GetOneTaskController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one task' })
  @ApiOkResponse({ type: () => GetOneTaskDaoModel })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER, Role.ENGINEER]))
  @Get(routes.task.byId)
  async getOneTask(
    @Param('id', ParseUUIDPipe) id: string,
    @MyId() staffId: string,
  ): Promise<GetOneTaskDaoModel> {
    const query = new GetOneTaskQuery({ params: { id, staffId } });

    const result: Result<GetOneTaskDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
