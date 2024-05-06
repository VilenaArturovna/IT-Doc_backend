import { TrxId, UnitOfWorkObjection } from '@libs/unit-of-work';
import { StaffObjectionRepository } from '@modules/staff/database/repositories';
import { TaskObjectionRepository } from '@modules/task/database/repositories';

export class TaskUnitOfWork extends UnitOfWorkObjection {
  public getStaffRepository(trxId: TrxId) {
    return new StaffObjectionRepository(this, trxId);
  }

  public getTaskRepository(trxId: TrxId) {
    return new TaskObjectionRepository(this, trxId);
  }
}
