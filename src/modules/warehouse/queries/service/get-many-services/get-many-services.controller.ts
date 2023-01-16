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
import { GetManyServicesQuery } from '@modules/warehouse/queries';
import { GetManyServicesDaoModel } from '@modules/warehouse/database/read-model';
import { GetManyServicesRequestDto } from './get-many-services.request.dto';

@ApiTags('warehouse/service')
@Controller()
export class GetManyServicesController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get many services' })
  @ApiOkResponse({ type: () => GetManyServicesDaoModel })
  @Get(routes.service.root)
  async getManyServices(
    @Query() params: GetManyServicesRequestDto,
  ): Promise<GetManyServicesDaoModel> {
    const query = new GetManyServicesQuery({ params });

    const result: Result<GetManyServicesDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
