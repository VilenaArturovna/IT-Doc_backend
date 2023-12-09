import { ExceptionBase } from '@libs/base-classes';
import {
  StartTransactionConfig,
  TrxId,
  UnitOfWorkPort,
} from '@libs/unit-of-work/unit-of-work.port';
import { Result } from '@libs/utils/result.util';

export abstract class UnitOfWork implements UnitOfWorkPort {
  abstract start(config?: StartTransactionConfig): Promise<TrxId>;

  abstract execute<ResultType>(
    trxId: TrxId,
    callback: () => Promise<Result<ResultType, ExceptionBase>>,
  ): Promise<Result<ResultType, ExceptionBase>>;

  abstract startFromId(
    id: string,
    config?: StartTransactionConfig,
  ): Promise<void>;

  abstract commit(id: TrxId): Promise<void>;

  abstract rollback(id: TrxId): Promise<void>;

  abstract getTrx(id: TrxId);
}
