import { QueryBase } from '@libs/base-classes';
import { GetManyTasksRequestDto } from '@modules/task/queries';

export class GetManyTasksQuery extends QueryBase<
  GetManyTasksRequestDto & { staffId: string }
> {}
