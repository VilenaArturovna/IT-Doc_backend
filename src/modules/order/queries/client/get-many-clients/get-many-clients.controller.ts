import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { GetManyClientsDaoModel } from '@modules/order/database/read-model';
import { GetManyClientsQuery } from '@modules/order/queries';
import { Role } from '@modules/staff/types';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GetManyClientsRequestDto } from './get-many-clients.request.dto';

@ApiTags('order/client')
@Controller()
export class GetManyClientsController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get many clients' })
  @ApiOkResponse({ type: () => GetManyClientsDaoModel })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER, Role.ENGINEER]))
  @Get(routes.client.root)
  async getManyClients(
    @Query() params: GetManyClientsRequestDto,
  ): Promise<GetManyClientsDaoModel> {
    const query = new GetManyClientsQuery({ params });

    const result: Result<GetManyClientsDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
