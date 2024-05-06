import { QueryBase } from '@libs/base-classes';

export class GetOneTaskQuery extends QueryBase<{
  id: string;
  staffId: string;
}> {}
