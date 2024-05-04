import { ObjectionRepositoryBase } from '@libs/base-classes';
import { TrxId, UnitOfWork } from '@libs/unit-of-work';
import { TaskEntity, TaskEntityProps } from '@modules/task/domain';

import { TaskObjectionOrmEntity, TaskOrmEntity } from '../entities';
import { TaskOrmMapper } from '../mappers';

export class TaskObjectionRepository extends ObjectionRepositoryBase<
  TaskEntity,
  TaskEntityProps,
  TaskOrmEntity,
  TaskObjectionOrmEntity,
  TaskOrmMapper
> {
  constructor(
    protected readonly unitOfWork: UnitOfWork,
    protected readonly trxId: TrxId,
  ) {
    super(TaskObjectionOrmEntity, new TaskOrmMapper(), unitOfWork, trxId);
  }
}
