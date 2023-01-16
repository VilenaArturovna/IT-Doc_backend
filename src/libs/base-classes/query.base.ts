import { IQuery } from '@nestjs/cqrs';

export abstract class QueryBase<Params extends Record<string, any> = unknown>
  implements IQuery
{
  public readonly params?: Params;

  constructor(props?: QueryBase<Params>) {
    Object.assign(this, props);
  }
}
