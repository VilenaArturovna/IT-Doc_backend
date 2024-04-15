import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { GetOneOrderDaoModel } from '@modules/order/database/read-model';
import { GetOneOrderQuery } from '@modules/order/queries';
import { Role } from '@modules/staff/types';
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

@ApiTags('order/order')
@Controller()
export class GetOneOrderController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one order' })
  @ApiOkResponse({ type: () => GetOneOrderDaoModel })
  @UseGuards(RoleGuard([Role.ADMIN, Role.ENGINEER, Role.MANAGER]))
  @Get(routes.order.byId)
  async getOneOrder(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetOneOrderDaoModel> {
    const query = new GetOneOrderQuery({});

    const result: Result<GetOneOrderDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
