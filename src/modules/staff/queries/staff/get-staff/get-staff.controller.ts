import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { GetManyStaffItem } from '@modules/staff/database/read-model';
import { GetStaffQuery } from '@modules/staff/queries';
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('staff')
@Controller()
export class GetStaffController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get staff' })
  @ApiOkResponse({ type: () => GetManyStaffItem })
  @Get(routes.staff.byId)
  async getStaff(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetManyStaffItem> {
    const query = new GetStaffQuery({ params: { id } });

    const result: Result<GetManyStaffItem, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
