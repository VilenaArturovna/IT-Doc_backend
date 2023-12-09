import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { GetManyWorksDaoModel } from '@modules/order/database/read-model';
import { GetManyWorksQuery } from '@modules/order/queries';
import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GetManyWorksRequestDto } from './get-many-works.request.dto';

@ApiTags('order/work')
@Controller()
export class GetManyWorksController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get many works' })
  @ApiOkResponse({ type: () => GetManyWorksDaoModel })
  @Get(routes.work.root)
  async getManyWorks(
    @Query() params: GetManyWorksRequestDto,
  ): Promise<GetManyWorksDaoModel> {
    const query = new GetManyWorksQuery({ params });

    const result: Result<GetManyWorksDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
