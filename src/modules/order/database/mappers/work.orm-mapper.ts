import {
  CreateEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/base-classes';
import { MoneyVO } from '@libs/value-objects';
import { WorkEntity, WorkEntityProps } from '@modules/order/domain';

import { WorkOrmEntity, WorkOrmEntityProps } from '../entities';

export class WorkOrmMapper extends OrmMapper<
  WorkEntity,
  WorkEntityProps,
  WorkOrmEntity
> {
  protected getEntityConstructor(ormEntity: WorkOrmEntity): {
    new (props: CreateEntityProps<WorkEntityProps>): WorkEntity;
  } {
    return WorkEntity;
  }

  protected getOrmEntityConstructor(entity: WorkEntity): {
    new (props: WorkOrmEntityProps): WorkOrmEntity;
  } {
    return WorkOrmEntity;
  }

  protected toDomainProps(ormEntity: WorkOrmEntity): WorkEntityProps {
    return {
      name: ormEntity.name,
      time: ormEntity.time,
      price: MoneyVO.toVO({ amount: ormEntity.price }),
    };
  }

  protected toOrmProps(entity: WorkEntity): OrmEntityProps<WorkOrmEntity> {
    const props = entity.getCopiedProps();
    return {
      name: props.name,
      time: props.time,
      price: props.price.amount,
    };
  }
}
