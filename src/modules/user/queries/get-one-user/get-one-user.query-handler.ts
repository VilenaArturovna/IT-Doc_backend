import { QueryHandler } from '@nestjs/cqrs';
import { GetOneUserQuery } from '@modules/user/queries/get-one-user/get-one-user.query';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { UserEntity } from '@modules/user/user.entity';

@QueryHandler(GetOneUserQuery)
export class GetOneUserQueryHandler {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: GetOneUserQuery): Promise<UserEntity> {
    return await this.repository.findOneOrThrow({ id: query.params.id });
  }
}
