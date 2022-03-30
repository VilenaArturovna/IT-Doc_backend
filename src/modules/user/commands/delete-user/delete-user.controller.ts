import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routes } from '@lib/routes';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteUserCommand } from '@modules/user/commands/delete-user/delete-user.command';
import { UserResponseDto } from '@modules/user/dtos/user.response.dto';

@ApiTags('user')
@Controller()
export class DeleteUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Delete one user' })
  @ApiOkResponse({ type: UserResponseDto })
  @Delete(routes.user.byId)
  async deleteUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponseDto> {
    const command = new DeleteUserCommand({ payload: { id } });

    const entity = await this.commandBus.execute(command);

    return new UserResponseDto(entity);
  }
}
