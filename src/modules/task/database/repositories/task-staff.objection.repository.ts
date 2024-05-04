import { ObjectionRepositoryBase } from '@libs/base-classes';
import { TrxId, UnitOfWork } from '@libs/unit-of-work';
import { TaskStaffEntity, TaskStaffEntityProps } from '@modules/task/domain';

import { TaskStaffObjectionOrmEntity, TaskStaffOrmEntity } from '../entities';
import { TaskStaffOrmMapper } from '../mappers';

export class TaskStaffObjectionRepository extends ObjectionRepositoryBase<
  TaskStaffEntity,
  TaskStaffEntityProps,
  TaskStaffOrmEntity,
  TaskStaffObjectionOrmEntity,
  TaskStaffOrmMapper
> {
  constructor(
    protected readonly unitOfWork: UnitOfWork,
    protected readonly trxId: TrxId,
  ) {
    super(
      TaskStaffObjectionOrmEntity,
      new TaskStaffOrmMapper(),
      unitOfWork,
      trxId,
    );
  }
}
