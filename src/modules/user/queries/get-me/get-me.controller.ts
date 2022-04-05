import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { routes } from '@lib/routes';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetMeQuery } from '@modules/user/queries/get-me/get-me.query';
import { UserResponseDto } from '@modules/user/dtos/user.response.dto';
import { MyId } from '@lib/decorators/my-id.decorator';

@ApiTags('user')
@Controller()
export class GetMeController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get me' })
  @ApiOkResponse({ type: UserResponseDto })
  @Get(routes.user.getMe)
  async getMe(@MyId() id: string): Promise<UserResponseDto> {
    const query = new GetMeQuery({ params: { id } });

    const entity = await this.queryBus.execute(query);

    return new UserResponseDto(entity);
  }
}
