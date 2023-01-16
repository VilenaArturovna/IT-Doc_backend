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
import { GetOneServiceQuery } from '@modules/warehouse/queries';
import { GetOneServiceDaoModel } from '@modules/warehouse/database/read-model';

@ApiTags('warehouse/service')
@Controller()
export class GetOneServiceController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one service' })
  @ApiOkResponse({ type: () => GetOneServiceDaoModel })
  @Get(routes.service.byId)
  async getOneService(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetOneServiceDaoModel> {
    const query = new GetOneServiceQuery({ params: { id } });

    const result: Result<GetOneServiceDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
