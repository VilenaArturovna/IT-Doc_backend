import { ObjectionRepositoryBase } from '@libs/base-classes';
import { TrxId, UnitOfWork } from '@libs/unit-of-work';
import { OrderStageEntity, OrderStageEntityProps } from '@modules/order/domain';

import { OrderStageObjectionOrmEntity, OrderStageOrmEntity } from '../entities';
import { OrderStageOrmMapper } from '../mappers';

export class OrderStageObjectionRepository extends ObjectionRepositoryBase<
  OrderStageEntity,
  OrderStageEntityProps,
  OrderStageOrmEntity,
  OrderStageObjectionOrmEntity,
  OrderStageOrmMapper
> {
  constructor(
    protected readonly unitOfWork: UnitOfWork,
    protected readonly trxId: TrxId,
  ) {
    super(
      OrderStageObjectionOrmEntity,
      new OrderStageOrmMapper(),
      unitOfWork,
      trxId,
    );
  }
}
