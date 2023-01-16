import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes/exception.base';

export abstract class ReadDaoBase<DaoModel, Params> {
  abstract query(query: Params): Promise<Result<DaoModel, ExceptionBase>>;
}
