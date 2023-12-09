import { TrxId, UnitOfWorkObjection } from '@libs/unit-of-work';
import { StaffObjectionRepository } from '@modules/staff/database/repositories';

export class StaffUnitOfWork extends UnitOfWorkObjection {
  public getStaffRepository(trxId: TrxId) {
    return new StaffObjectionRepository(this, trxId);
  }
}
