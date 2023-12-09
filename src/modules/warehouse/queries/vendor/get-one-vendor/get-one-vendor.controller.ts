import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { GetOneVendorDaoModel } from '@modules/warehouse/database/read-model';
import { GetOneVendorQuery } from '@modules/warehouse/queries';
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('warehouse/vendor')
@Controller()
export class GetOneVendorController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one vendor' })
  @ApiOkResponse({ type: () => GetOneVendorDaoModel })
  @Get(routes.vendor.byId)
  async getOneVendor(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetOneVendorDaoModel> {
    const query = new GetOneVendorQuery({ params: { id } });

    const result: Result<GetOneVendorDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
