import { ExceptionBase } from '@libs/base-classes';
import { StartTransactionConfig, TrxId, UnitOfWork } from '@libs/unit-of-work';
import { Result } from '@libs/utils/result.util';
import { UuidVO } from '@libs/value-objects';
import { Model, Transaction } from 'objection';

export class UnitOfWorkObjection extends UnitOfWork {
  protected transactions: Map<TrxId, Transaction> = new Map<
    TrxId,
    Transaction
  >();

  async start(config?: StartTransactionConfig): Promise<TrxId> {
    const id: TrxId = UuidVO.generate().value;
    await this.startFromId(id, config);
    return id;
  }

  async startFromId(id: string, config?: StartTransactionConfig) {
    if (!this.transactions.has(id)) {
      const trx = await Model.knex().transaction({
        isolationLevel: config?.isolationLevel,
      });

      this.transactions.set(id, trx);
    }
  }

  async execute<ResultType>(
    trxId: TrxId,
    callback: () => Promise<Result<ResultType, ExceptionBase>>,
  ): Promise<Result<ResultType, ExceptionBase>> {
    try {
      const result = await callback();

      if (result.isErr) {
        await this.rollback(trxId);
      } else {
        await this.commit(trxId);
      }

      return result;
    } catch (e) {
      await this.rollback(trxId);
      throw e;
    }
  }

  public getTrx(id: TrxId) {
    const trx = this.transactions.get(id);

    if (!trx) {
      throw new Error('Transaction not found');
    }

    return trx;
  }

  protected finish(id: TrxId) {
    this.transactions.delete(id);
  }

  async commit(id: TrxId) {
    const trx = this.getTrx(id);

    await trx.commit();
  }

  async rollback(id: TrxId) {
    const trx = this.transactions.get(id);

    if (trx) {
      await trx.rollback();

      this.finish(id);
    }
  }
}
