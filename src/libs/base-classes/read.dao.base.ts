import { ExceptionBase } from '@libs/base-classes/exception.base';
import { Result } from '@libs/utils';

export abstract class ReadDaoBase<DaoModel, Params> {
  abstract query(query: Params): Promise<Result<DaoModel, ExceptionBase>>;
}
