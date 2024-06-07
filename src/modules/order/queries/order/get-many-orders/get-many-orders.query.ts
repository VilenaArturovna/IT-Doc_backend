import { QueryBase } from '@libs/base-classes';
import { GetManyOrdersRequestDto } from '@modules/order/queries';

export class GetManyOrdersQuery extends QueryBase<
  GetManyOrdersRequestDto & { staffId?: string; isAdmin: boolean }
> {}
