import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routes } from '@lib/routes';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResetPasswordCommand } from '@modules/user/commands/reset-password/reset-password.command';
import { UserResponseDto } from '@modules/user/dtos/user.response.dto';
import { ResetPasswordRequestDto } from '@modules/user/commands/reset-password/reset-password.request.dto';
import { Public } from '@lib/decorators/public.decorator';

@ApiTags('user/auth')
@Controller()
export class ResetPasswordController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @ApiOperation({ summary: 'Reset password' })
  @ApiOkResponse({ type: UserResponseDto })
  @Post(routes.auth.resetPassword)
  async resetPassword(
    @Body() body: ResetPasswordRequestDto,
  ): Promise<UserResponseDto> {
    const command = new ResetPasswordCommand({ payload: body });

    const entity = await this.commandBus.execute(command);

    return new UserResponseDto(entity);
  }
}
