import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Role } from '@modules/staff/types';
import { GetManyVendorsDaoModel } from '@modules/warehouse/database/read-model';
import { GetManyVendorsQuery } from '@modules/warehouse/queries';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GetManyVendorsRequestDto } from './get-many-vendors.request.dto';

@ApiTags('warehouse/vendor')
@Controller()
export class GetManyVendorsController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get many vendors' })
  @ApiOkResponse({ type: () => GetManyVendorsDaoModel })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER, Role.ENGINEER]))
  @ApiExtraModels(GetManyVendorsRequestDto)
  @Get(routes.vendor.root)
  async getManyVendors(
    @Query() params: GetManyVendorsRequestDto,
  ): Promise<GetManyVendorsDaoModel> {
    const query = new GetManyVendorsQuery({ params });

    const result: Result<GetManyVendorsDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
