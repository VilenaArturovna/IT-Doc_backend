import { TrxId, UnitOfWorkObjection } from '@libs/unit-of-work';
import {
  ClientObjectionRepository,
  DeadlineObjectionRepository,
  OrderObjectionRepository,
  WorkObjectionRepository,
} from '@modules/order/database/repositories';
import { StaffObjectionRepository } from '@modules/staff/database/repositories';
import { WarehouseItemObjectionRepository } from '@modules/warehouse/database/repositories';

export class OrderUnitOfWork extends UnitOfWorkObjection {
  public getStaffRepository(trxId: TrxId) {
    return new StaffObjectionRepository(this, trxId);
  }

  public getClientRepository(trxId: TrxId) {
    return new ClientObjectionRepository(this, trxId);
  }

  public getDeadlineRepository(trxId: TrxId) {
    return new DeadlineObjectionRepository(this, trxId);
  }

  public getOrderRepository(trxId: TrxId) {
    return new OrderObjectionRepository(this, trxId);
  }

  public getWorkRepository(trxId: TrxId) {
    return new WorkObjectionRepository(this, trxId);
  }

  public getWarehouseItemRepository(trxId: TrxId) {
    return new WarehouseItemObjectionRepository(this, trxId);
  }
}
