import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { StaffSignInQuery } from '@modules/staff/queries';
import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@src/common';

import { StaffSignInRequestDto } from './staff-sign-in.request.dto';
import { StaffSignInResponseDto } from './staff-sign-in.response.dto';

@ApiTags('staff/auth')
@Controller()
export class StaffSignInController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @ApiOperation({ summary: 'Staff sign in' })
  @ApiOkResponse({ type: () => StaffSignInResponseDto })
  @Get(routes.staff.auth.signIn)
  async staffSignIn(
    @Query() params: StaffSignInRequestDto,
  ): Promise<StaffSignInResponseDto> {
    const query = new StaffSignInQuery({ params });

    const result: Result<StaffSignInResponseDto, ExceptionBase> =
      await this.queryBus.execute(query);

    return result
      .mapValue((props) => new StaffSignInResponseDto(props))
      .unwrap();
  }
}
