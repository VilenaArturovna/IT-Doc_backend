import { ObjectionRepositoryBase } from '@libs/base-classes';
import { DeadlineEntity, DeadlineEntityProps } from '@modules/order/domain';
import { DeadlineObjectionOrmEntity, DeadlineOrmEntity } from '../entities';
import { DeadlineOrmMapper } from '../mappers';

export class DeadlineObjectionRepository extends ObjectionRepositoryBase<
  DeadlineEntity,
  DeadlineEntityProps,
  DeadlineOrmEntity,
  DeadlineObjectionOrmEntity,
  DeadlineOrmMapper
> {
  constructor() {
    super(DeadlineObjectionOrmEntity, new DeadlineOrmMapper());
  }
}
