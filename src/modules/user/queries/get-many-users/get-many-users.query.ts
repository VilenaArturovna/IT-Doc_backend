import { QueryBase } from '@lib/base-classes/query.base';
import { GetManyUsersRequestDto } from '@modules/user/queries/get-many-users/get-many-users.request.dto';

export class GetManyUsersQuery extends QueryBase<GetManyUsersRequestDto> {}
