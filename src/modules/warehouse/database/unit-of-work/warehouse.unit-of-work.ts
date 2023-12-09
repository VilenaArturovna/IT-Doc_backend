import { TrxId, UnitOfWorkObjection } from '@libs/unit-of-work';
import {
  ProviderObjectionRepository,
  VendorObjectionRepository,
  WarehouseItemObjectionRepository,
} from '@modules/warehouse/database/repositories';

export class WarehouseUnitOfWork extends UnitOfWorkObjection {
  public getProviderRepository(trxId: TrxId) {
    return new ProviderObjectionRepository(this, trxId);
  }

  public getVendorRepository(trxId: TrxId) {
    return new VendorObjectionRepository(this, trxId);
  }

  public getWarehouseItemRepository(trxId: TrxId) {
    return new WarehouseItemObjectionRepository(this, trxId);
  }
}
