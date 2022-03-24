import {Body, Controller, Post} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {routes} from "@lib/routes";
import {CreateUserRequestDto} from "@modules/user/commands/create-user/create-user.request.dto";
import {UserResponseDto} from "@modules/user/dtos/user.response.dto";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {CreateUserCommand} from "@modules/user/commands/create-user/create-user.command";

@Controller()
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({summary: 'Create user'})
  @ApiOkResponse({type: UserResponseDto})
  @Post(routes.user.root)
  async create(@Body() body: CreateUserRequestDto): Promise<UserResponseDto> {
    const command = new CreateUserCommand({ payload: body })

    return await this.commandBus.execute(command);
  }
}
