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
import { GetManyStaffQuery } from '@modules/staff/queries';
import { GetManyStaffDaoModel } from '@modules/staff/database/read-model';
import { GetManyStaffRequestDto } from './get-many-staff.request.dto';

@ApiTags('staff')
@Controller()
export class GetManyStaffController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get many staff' })
  @ApiOkResponse({ type: () => GetManyStaffDaoModel })
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
