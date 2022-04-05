import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routes } from '@lib/routes';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordCommand } from '@modules/user/commands/forgot-password/forgot-password.command';
import { ForgotPasswordRequestDto } from '@modules/user/commands/forgot-password/forgot-password.request.dto';
import { Public } from '@lib/decorators/public.decorator';

@ApiTags('user/auth')
@Controller()
export class ForgotPasswordController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @ApiOperation({ summary: 'Forgot password' })
  @Post(routes.auth.forgotPassword)
  async forgotPassword(
    @Body() body: ForgotPasswordRequestDto,
  ): Promise<boolean> {
    const command = new ForgotPasswordCommand({ payload: body });

    return await this.commandBus.execute(command);
  }
}
