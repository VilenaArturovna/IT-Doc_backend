import { ObjectionRepositoryBase } from '@libs/base-classes';
import { OrderEntity, OrderEntityProps } from '@modules/order/domain';
import { OrderObjectionOrmEntity, OrderOrmEntity } from '../entities';
import { OrderOrmMapper } from '../mappers';

export class OrderObjectionRepository extends ObjectionRepositoryBase<
  OrderEntity,
  OrderEntityProps,
  OrderOrmEntity,
  OrderObjectionOrmEntity,
  OrderOrmMapper
> {
  constructor() {
    super(OrderObjectionOrmEntity, new OrderOrmMapper());
  }
}
