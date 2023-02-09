import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Result } from '@libs/utils';
import { routes } from '@libs/routes';
import { ExceptionBase } from '@libs/base-classes';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetOneWorkQuery } from '@modules/order/queries';
import { GetOneWorkDaoModel } from '@modules/order/database/read-model';

@ApiTags('order/work')
@Controller()
export class GetOneWorkController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one work' })
  @ApiOkResponse({ type: () => GetOneWorkDaoModel })
  @Get(routes.work.byId)
  async getOneWork(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetOneWorkDaoModel> {
    const query = new GetOneWorkQuery({ params: { id } });

    const result: Result<GetOneWorkDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
