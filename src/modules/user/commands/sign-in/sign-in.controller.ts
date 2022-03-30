import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routes } from '@lib/routes';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInCommand } from '@modules/user/commands/sign-in/sign-in.command';
import { AuthResponseDto } from '@modules/user/dtos/auth.response.dto';
import { UserEntity } from '@modules/user/user.entity';
import { SignInRequestDto } from '@modules/user/commands/sign-in/sign-in.request.dto';

@ApiTags('user/auth')
@Controller()
export class SignInController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Sign in' })
  @ApiOkResponse({ type: AuthResponseDto })
  @Post(routes.user.signIn)
  async signIn(@Body() body: SignInRequestDto): Promise<AuthResponseDto> {
    const command = new SignInCommand({ payload: body });

    const response: UserEntity & { token: string } =
      await this.commandBus.execute(command);

    return new AuthResponseDto(response);
  }
}
