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
import { GetOneProviderQuery } from '@modules/warehouse/queries';
import { GetOneProviderDaoModel } from '@modules/warehouse/database/read-model';

@ApiTags('warehouse/provider')
@Controller()
export class GetOneProviderController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one provider' })
  @ApiOkResponse({ type: () => GetOneProviderDaoModel })
  @Get(routes.provider.byId)
  async getOneProvider(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetOneProviderDaoModel> {
    const query = new GetOneProviderQuery({ params: { id } });

    const result: Result<GetOneProviderDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
