import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { routes } from '@lib/routes';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetOneUserQuery } from '@modules/user/queries/get-one-user/get-one-user.query';
import { UserResponseDto } from '@modules/user/dtos/user.response.dto';

@ApiTags('user')
@Controller()
export class GetOneUserController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one user' })
  @ApiOkResponse({ type: UserResponseDto })
  @Get(routes.user.byId)
  async getOneUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponseDto> {
    const query = new GetOneUserQuery({ params: { id } });

    const entity = await this.queryBus.execute(query);

    return new UserResponseDto(entity);
  }
}
