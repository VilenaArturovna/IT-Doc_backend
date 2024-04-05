import {
  CreateEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/base-classes';
import { DateVO } from '@libs/value-objects';
import { OrderStageEntity, OrderStageEntityProps } from '@modules/order/domain';

import { OrderStageOrmEntity, OrderStageOrmEntityProps } from '../entities';

export class OrderStageOrmMapper extends OrmMapper<
  OrderStageEntity,
  OrderStageEntityProps,
  OrderStageOrmEntity
> {
  protected getEntityConstructor(): {
    new (props: CreateEntityProps<OrderStageEntityProps>): OrderStageEntity;
  } {
    return OrderStageEntity;
  }

  protected getOrmEntityConstructor(): {
    new (props: OrderStageOrmEntityProps): OrderStageOrmEntity;
  } {
    return OrderStageOrmEntity;
  }

  protected toDomainProps(
    ormEntity: OrderStageOrmEntity,
  ): OrderStageEntityProps {
    return {
      completedAt: ormEntity.completedAt
        ? new DateVO(ormEntity.completedAt)
        : undefined,
      deadline: ormEntity.deadline ? new DateVO(ormEntity.deadline) : undefined,
      status: ormEntity.status,
      number: ormEntity.number,
    };
  }

  protected toOrmProps(
    entity: OrderStageEntity,
  ): OrmEntityProps<OrderStageOrmEntity> {
    const props = entity.getCopiedProps();
    return {
      number: props.number,
      status: props.status,
      deadline: props.deadline ? props.deadline.ISOString : null,
      completedAt: props.completedAt ? props.completedAt.ISOString : null,
      orderId: '',
    };
  }
}
