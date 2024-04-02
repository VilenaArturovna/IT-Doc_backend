import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { LoginViaTgResponseDto } from '@modules/staff/commands/auth/login-via-tg/login-via-tg.response.dto';
import { StaffEntity } from '@modules/staff/domain';
import { StaffResponseDto } from '@modules/staff/dtos';
import { Body, Controller, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { LoginViaTgCommand } from './login-via-tg.command';
import { LoginViaTgRequestDto } from './login-via-tg.request.dto';

@ApiTags('staff/auth')
@Controller()
export class LoginViaTgController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Login via tg' })
  @ApiOkResponse({ type: LoginViaTgResponseDto })
  @Patch(routes.staff.auth.login)
  async loginViaTg(
    @Body() body: LoginViaTgRequestDto,
  ): Promise<LoginViaTgResponseDto> {
    const command = new LoginViaTgCommand({ payload: body });

    const result: Result<{ staff: StaffEntity; token: string }, ExceptionBase> =
      await this.commandBus.execute(command);

    return result
      .mapValue(({ staff, token }) => {
        const entity = new StaffResponseDto(staff);

        return { ...entity, token };
      })
      .unwrap();
  }
}
