import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Role } from '@modules/staff/types';
import { GetOneProviderDaoModel } from '@modules/warehouse/database/read-model';
import { GetOneProviderQuery } from '@modules/warehouse/queries';
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('warehouse/provider')
@Controller()
export class GetOneProviderController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one provider' })
  @ApiOkResponse({ type: () => GetOneProviderDaoModel })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER, Role.ENGINEER]))
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
