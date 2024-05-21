import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Role } from '@modules/staff/types';
import { GetManyProvidersDaoModel } from '@modules/warehouse/database/read-model';
import { GetManyProvidersQuery } from '@modules/warehouse/queries';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GetManyProvidersRequestDto } from './get-many-providers.request.dto';

@ApiTags('warehouse/provider')
@Controller()
export class GetManyProvidersController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get many providers' })
  @ApiOkResponse({ type: () => GetManyProvidersDaoModel })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER, Role.ENGINEER]))
  @ApiExtraModels(GetManyProvidersRequestDto)
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
