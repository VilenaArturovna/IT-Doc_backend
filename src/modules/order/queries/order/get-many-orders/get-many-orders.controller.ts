import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { GetManyOrdersDaoModel } from '@modules/order/database/read-model';
import { GetManyOrdersQuery } from '@modules/order/queries';
import { Role } from '@modules/staff/types';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IAM, MyId } from '@src/common';

import { GetManyOrdersRequestDto } from './get-many-orders.request.dto';

@ApiTags('order/order')
@Controller()
export class GetManyOrdersController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get many orders' })
  @ApiOkResponse({ type: () => GetManyOrdersDaoModel })
  @ApiExtraModels(GetManyOrdersRequestDto)
  @UseGuards(RoleGuard([Role.ADMIN, Role.ENGINEER, Role.MANAGER]))
  @Get(routes.order.root)
  async getManyOrders(
    @Query() params: GetManyOrdersRequestDto,
    @MyId() staffId: string,
    @IAM('role') role: Role,
  ): Promise<GetManyOrdersDaoModel> {
    const query = new GetManyOrdersQuery({
      params: {
        ...params,
        staffId: role === Role.ENGINEER ? staffId : undefined,
        isAdmin: role === Role.ADMIN,
      },
    });

    const result: Result<GetManyOrdersDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
