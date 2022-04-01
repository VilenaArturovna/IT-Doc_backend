import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routes } from '@lib/routes';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AcceptInviteCommand } from '@modules/user/commands/accept-invite/accept-invite.command';
import { UserResponseDto } from '@modules/user/dtos/user.response.dto';
import { AcceptInviteRequestDto } from '@modules/user/commands/accept-invite/accept-invite.request.dto';

@ApiTags('user/auth')
@Controller()
export class AcceptInviteController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Accept invite' })
  @ApiOkResponse({ type: UserResponseDto })
  @Post(routes.user.acceptInvite)
  async acceptInvite(
    @Body() body: AcceptInviteRequestDto,
    @Param('hash') inviteHash: string,
  ): Promise<UserResponseDto> {
    const command = new AcceptInviteCommand({
      payload: { ...body, inviteHash },
    });

    const entity = await this.commandBus.execute(command);

    return new UserResponseDto(entity);
  }
}
