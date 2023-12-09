import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Body, Controller, HttpCode, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@src/common';

import { ForgotPasswordCommand } from './forgot-password.command';
import { ForgotPasswordRequestDto } from './forgot-password.request.dto';

@ApiTags('staff/auth')
@Controller()
export class ForgotPasswordController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @ApiOperation({ summary: 'Forgot password' })
  @HttpCode(204)
  @Patch(routes.staff.auth.forgotPassword)
  async forgotPassword(@Body() body: ForgotPasswordRequestDto): Promise<void> {
    const command = new ForgotPasswordCommand({ payload: body });

    const result: Result<void, ExceptionBase> = await this.commandBus.execute(
      command,
    );

    return result.unwrap();
  }
}
