import { Controller, Get, Query } from '@nestjs/common';
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
import { GetManyProvidersQuery } from '@modules/warehouse/queries';
import { GetManyProvidersDaoModel } from '@modules/warehouse/database/read-model';
import { GetManyProvidersRequestDto } from './get-many-providers.request.dto';

@ApiTags('warehouse/provider')
@Controller()
export class GetManyProvidersController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get many providers' })
  @ApiOkResponse({ type: () => GetManyProvidersDaoModel })
  @Get(routes.provider.root)
  async getManyProviders(
    @Query() params: GetManyProvidersRequestDto,
  ): Promise<GetManyProvidersDaoModel> {
    const query = new GetManyProvidersQuery({ params });

    const result: Result<GetManyProvidersDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
