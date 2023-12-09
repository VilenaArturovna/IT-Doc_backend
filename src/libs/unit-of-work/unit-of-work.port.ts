import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils/result.util';

export type TrxId = string;

export type IsolationLevels =
  | 'read uncommitted'
  | 'read committed'
  | 'snapshot'
  | 'repeatable read'
  | 'serializable';

export interface StartTransactionConfig {
  isolationLevel?: IsolationLevels;
}

export interface UnitOfWorkPort {
  start(config?: StartTransactionConfig): Promise<TrxId>;

  execute<ResultType>(
    trxId: TrxId,
    callback: () => Promise<Result<ResultType, ExceptionBase>>,
  ): Promise<Result<ResultType, ExceptionBase>>;

  startFromId(id: string, config?: StartTransactionConfig): Promise<void>;

  commit(id: TrxId): Promise<void>;

  rollback(id: TrxId): Promise<void>;

  getTrx(id: TrxId);
}
