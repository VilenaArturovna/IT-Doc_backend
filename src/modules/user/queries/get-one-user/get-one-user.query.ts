import { QueryBase } from '@lib/base-classes/query.base';
import { GetOneUserRequestDto } from '@modules/user/queries/get-one-user/get-one-user.request.dto';

export class GetOneUserQuery extends QueryBase<
  GetOneUserRequestDto & { id: string }
> {}
