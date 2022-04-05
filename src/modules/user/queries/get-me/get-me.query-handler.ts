import { QueryHandler } from '@nestjs/cqrs';
import { GetMeQuery } from '@modules/user/queries/get-me/get-me.query';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { UserEntity } from '@modules/user/user.entity';

@QueryHandler(GetMeQuery)
export class GetMeQueryHandler {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: GetMeQuery): Promise<UserEntity> {
    return await this.repository.findOneById(query.params.id);
  }
}
