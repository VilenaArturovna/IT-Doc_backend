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
import { GetManyVendorsQuery } from '@modules/warehouse/queries';
import { GetManyVendorsDaoModel } from '@modules/warehouse/database/read-model';
import { GetManyVendorsRequestDto } from './get-many-vendors.request.dto';

@ApiTags('warehouse/vendor')
@Controller()
export class GetManyVendorsController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get many vendors' })
  @ApiOkResponse({ type: () => GetManyVendorsDaoModel })
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
