import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routes } from '@lib/routes';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserCommand } from '@modules/user/commands/update-user/update-user.command';
import { UserResponseDto } from '@modules/user/dtos/user.response.dto';
import { UpdateUserRequestDto } from '@modules/user/commands/update-user/update-user.request.dto';

@ApiTags('user')
@Controller()
export class UpdateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user information' })
  @ApiOkResponse({ type: UserResponseDto })
  @Patch(routes.user.byId)
  async updateUser(
    @Body() body: UpdateUserRequestDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponseDto> {
    const command = new UpdateUserCommand({ payload: { ...body, id } });

    const entity = await this.commandBus.execute(command);

    return new UserResponseDto(entity);
  }
}
