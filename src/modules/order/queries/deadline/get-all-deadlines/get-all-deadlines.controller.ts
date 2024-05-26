import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { GetAllDeadlinesDaoModel } from '@modules/order/database/read-model';
import { GetAllDeadlinesQuery } from '@modules/order/queries';
import { Role } from '@modules/staff/types';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('order/deadline')
@Controller()
export class GetAllDeadlinesController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all deadlines' })
  @ApiOkResponse({ type: () => GetAllDeadlinesDaoModel, isArray: true })
  @UseGuards(RoleGuard([Role.ADMIN]))
  @Get(routes.deadline.root)
  async getAllDeadlines(): Promise<GetAllDeadlinesDaoModel[]> {
    const query = new GetAllDeadlinesQuery({});

    const result: Result<GetAllDeadlinesDaoModel[], ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
