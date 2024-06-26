import { TrxId, UnitOfWorkObjection } from '@libs/unit-of-work';
import { OrderObjectionRepository } from '@modules/order/database/repositories';

export class TelegramUnitOfWork extends UnitOfWorkObjection {
  public getOrderRepository(trxId: TrxId) {
    return new OrderObjectionRepository(this, trxId);
  }
}
