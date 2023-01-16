import { Body, Controller, HttpCode, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResetPasswordCommand } from './reset-password.command';
import { ResetPasswordRequestDto } from './reset-password.request.dto';
import { Public } from '@src/common';

@ApiTags('staff/auth')
@Controller()
export class ResetPasswordController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @ApiOperation({ summary: 'Reset password' })
  @HttpCode(204)
  @Patch(routes.staff.auth.resetPassword)
  async resetPassword(@Body() body: ResetPasswordRequestDto): Promise<void> {
    const command = new ResetPasswordCommand({ payload: body });

    const result: Result<void, ExceptionBase> = await this.commandBus.execute(
      command,
    );

    result.unwrap();
  }
}
