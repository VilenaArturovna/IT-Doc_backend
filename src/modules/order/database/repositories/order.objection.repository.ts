import { ExceptionBase, ObjectionRepositoryBase } from '@libs/base-classes';
import { NotFoundException } from '@libs/exceptions';
import { TrxId, UnitOfWork } from '@libs/unit-of-work';
import { deleteObjectKeys, Result } from '@libs/utils';
import { IdVO, UuidVO } from '@libs/value-objects';
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
  constructor(
    protected readonly unitOfWork: UnitOfWork,
    protected readonly trxId: TrxId,
  ) {
    super(OrderObjectionOrmEntity, new OrderOrmMapper(), unitOfWork, trxId);

    this.graph = {
      stages: true,
      repairParts: {
        warehouseItem: {
          vendor: true,
          provider: true,
        },
      },
      client: true,
      responsibleStaff: true,
      works: true,
    };
  }

  private readonly graph: object;

  async getOneById(id: IdVO): Promise<Result<OrderEntity, ExceptionBase>> {
    const transaction = this.unitOfWork.getTrx(this.trxId);
    try {
      const ormEntity = await this.repository
        .query(transaction)
        .findById(id.value)
        .withGraphJoined(this.graph);

      if (!ormEntity) {
        return Result.fail(new NotFoundException('Entity not found'));
      }

      const domainEntity = this.mapper.toDomainEntity(ormEntity);

      return Result.ok(domainEntity);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async create(
    entity: OrderEntity,
  ): Promise<Result<OrderEntity, ExceptionBase>> {
    const transaction = this.unitOfWork.getTrx(this.trxId);
    try {
      const ormEntity = this.mapper.toOrmEntity(entity);

      const order = await this.repository
        .query(transaction)
        .insertGraph(ormEntity);

      return this.getOneById(new UuidVO(order.id));
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getManyByIds(
    ids: IdVO[],
  ): Promise<Result<OrderEntity[], ExceptionBase>> {
    const transaction = this.unitOfWork.getTrx(this.trxId);
    try {
      const ormEntities = await this.repository
        .query(transaction)
        .findByIds(ids.map((id) => id.value))
        .withGraphJoined(this.graph);

      if (ids.length !== ormEntities.length) {
        return Result.fail(new NotFoundException('Entities not found'));
      }

      const domainEntities = ormEntities.map((ormEntity) =>
        this.mapper.toDomainEntity(ormEntity),
      );

      return Result.ok(domainEntities);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async update(
    entity: OrderEntity,
  ): Promise<Result<OrderEntity, ExceptionBase>> {
    const transaction = this.unitOfWork.getTrx(this.trxId);

    try {
      const ormEntity = this.mapper.toOrmEntity(entity);

      const existedStagesIds = (
        await this.repository
          .query(transaction)
          .findById(entity.id.value)
          .withGraphFetched(this.graph)
      ).stages?.map((s) => s.id);

      const clonedStages = [];
      for (const stage of ormEntity.stages) {
        if (!existedStagesIds.includes(stage.id)) {
          const cloneStage = deleteObjectKeys(stage, ['id']);
          clonedStages.push(cloneStage);
        }
      }

      ormEntity.stages = ormEntity.stages.concat(clonedStages);

      await this.repository
        .query(transaction)
        .upsertGraph(ormEntity, { relate: true });

      return this.getOneById(entity.id);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
