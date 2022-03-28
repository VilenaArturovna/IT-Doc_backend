import { QueryHandler } from '@nestjs/cqrs';
import { GetManyUsersQuery } from '@modules/user/queries/get-many-users/get-many-users.query';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { UserEntity } from '@modules/user/user.entity';

@QueryHandler(GetManyUsersQuery)
export class GetManyUsersQueryHandler {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: GetManyUsersQuery): Promise<UserEntity[]> {
    return await this.repository.findMany({ ...query.params });
  }
}
