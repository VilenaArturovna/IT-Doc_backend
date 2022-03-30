import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { routes } from '@lib/routes';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetManyUsersQuery } from '@modules/user/queries/get-many-users/get-many-users.query';
import { UserResponseDto } from '@modules/user/dtos/user.response.dto';
import { UserEntity } from '@modules/user/user.entity';
import { GetManyUsersRequestDto } from '@modules/user/queries/get-many-users/get-many-users.request.dto';

@ApiTags('user')
@Controller()
export class GetManyUsersController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get many users' })
  @ApiOkResponse({ type: UserResponseDto, isArray: true })
  @ApiExtraModels(GetManyUsersRequestDto)
  @Get(routes.user.root)
  async getManyUsers(
    @Query() queryParams: GetManyUsersRequestDto,
  ): Promise<UserResponseDto[]> {
    const query = new GetManyUsersQuery({ params: { ...queryParams } });

    const entities: UserEntity[] = await this.queryBus.execute(query);

    return entities.map((entity) => new UserResponseDto(entity));
  }
}
