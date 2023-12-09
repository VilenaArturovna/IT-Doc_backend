import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { StaffGetMeDaoModel } from '@modules/staff/database/read-model';
import { StaffGetMeQuery } from '@modules/staff/queries';
import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MyId } from '@src/common';

@ApiTags('staff')
@Controller()
export class StaffGetMeController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Staff get me' })
  @ApiOkResponse({ type: () => StaffGetMeDaoModel })
  @Get(routes.staff.getMe)
  async staffGetMe(@MyId() id: string): Promise<StaffGetMeDaoModel> {
    const query = new StaffGetMeQuery({ params: { id } });

    const result: Result<StaffGetMeDaoModel, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
