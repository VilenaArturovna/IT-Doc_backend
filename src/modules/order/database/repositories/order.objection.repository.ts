import { ObjectionRepositoryBase } from '@libs/base-classes';
import { OrderEntity, OrderEntityProps } from '@modules/order/domain';
import { OrderObjectionOrmEntity, OrderOrmEntity } from '../entities';
import { OrderOrmMapper } from '../mappers';
import { TrxId, UnitOfWork } from '@libs/unit-of-work';

export class OrderObjectionRepository extends ObjectionRepositoryBase<
  OrderEntity,
  OrderEntityProps,
  OrderOrmEntity,
  OrderObjectionOrmEntity,
  OrderOrmMapper
> {
  constructor(
    protected readonly unitOfWork: UnitOfWork,
    protected readonly trxId: TrxId,
  ) {
    super(OrderObjectionOrmEntity, new OrderOrmMapper(), unitOfWork, trxId);
  }
}
