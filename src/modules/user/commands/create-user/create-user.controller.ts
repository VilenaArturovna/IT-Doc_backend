import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routes } from '@lib/routes';
import { CreateUserRequestDto } from '@modules/user/commands/create-user/create-user.request.dto';
import { UserResponseDto } from '@modules/user/dtos/user.response.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserCommand } from '@modules/user/commands/create-user/create-user.command';

@ApiTags('user')
@Controller()
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({ type: UserResponseDto })
  @Post(routes.user.root)
  async create(@Body() body: CreateUserRequestDto): Promise<UserResponseDto> {
    const command = new CreateUserCommand({ payload: body });

    const entity = await this.commandBus.execute(command);

    return new UserResponseDto(entity);
  }
}
