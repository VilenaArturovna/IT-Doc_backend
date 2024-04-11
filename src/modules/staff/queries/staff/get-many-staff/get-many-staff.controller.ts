import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { GetManyStaffDaoModel } from '@modules/staff/database/read-model';
import { GetManyStaffQuery } from '@modules/staff/queries';
import { Role } from '@modules/staff/types';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GetManyStaffRequestDto } from './get-many-staff.request.dto';

@ApiTags('staff')
@Controller()
export class GetManyStaffController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get many staff' })
  @ApiOkResponse({ type: () => GetManyStaffDaoModel })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER]))
  @Get(routes.staff.root)
  async getManyStaff(
    @Query() params: GetManyStaffRequestDto,
  ): Promise<GetManyStaffDaoModel> {
    const query = new GetManyStaffQuery({ params });

    const result: Result<GetManyStaffDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
