import { ObjectionRepositoryBase } from '@libs/base-classes';
import { WorkEntity, WorkEntityProps } from '@modules/order/domain';
import { WorkObjectionOrmEntity, WorkOrmEntity } from '../entities';
import { WorkOrmMapper } from '../mappers';

export class WorkObjectionRepository extends ObjectionRepositoryBase<
  WorkEntity,
  WorkEntityProps,
  WorkOrmEntity,
  WorkObjectionOrmEntity,
  WorkOrmMapper
> {
  constructor() {
    super(WorkObjectionOrmEntity, new WorkOrmMapper());
  }
}
