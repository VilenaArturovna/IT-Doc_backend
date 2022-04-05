import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routes } from '@lib/routes';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ChangePasswordCommand } from '@modules/user/commands/change-password/change-password.command';
import { UserResponseDto } from '@modules/user/dtos/user.response.dto';
import { ChangePasswordRequestDto } from '@modules/user/commands/change-password/change-password.request.dto';
import { MyId } from '@lib/decorators/my-id.decorator';

@ApiTags('user')
@Controller()
export class ChangePasswordController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change password' })
  @ApiOkResponse({ type: UserResponseDto })
  @Post(routes.user.changePassword)
  async changePassword(
    @MyId() id: string,
    @Body() body: ChangePasswordRequestDto,
  ): Promise<UserResponseDto> {
    const command = new ChangePasswordCommand({ payload: { ...body, id } });

    const entity = await this.commandBus.execute(command);

    return new UserResponseDto(entity);
  }
}
