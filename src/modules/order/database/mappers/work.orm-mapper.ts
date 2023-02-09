import {
  CreateEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/base-classes';
import { WorkEntity, WorkEntityProps } from '@modules/order/domain';
import { WorkOrmEntity, WorkOrmEntityProps } from '../entities';
import { Currency, MoneyVO } from '@libs/value-objects';

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
      price: MoneyVO.toVO({ amount: ormEntity.price, currency: Currency.RUR }),
      priority: ormEntity.priority,
    };
  }

  protected toOrmProps(entity: WorkEntity): OrmEntityProps<WorkOrmEntity> {
    const props = entity.getCopiedProps();
    return {
      name: props.name,
      time: props.time,
      price: props.price.amount,
      priority: props.priority,
    };
  }
}