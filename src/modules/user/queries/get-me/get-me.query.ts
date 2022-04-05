import { QueryBase } from '@lib/base-classes/query.base';
import { GetMeRequestDto } from '@modules/user/queries/get-me/get-me.request.dto';

export class GetMeQuery extends QueryBase<GetMeRequestDto & { id: string }> {}
