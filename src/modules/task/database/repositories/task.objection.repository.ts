import { ExceptionBase, ObjectionRepositoryBase } from '@libs/base-classes';
import { NotFoundException } from '@libs/exceptions';
import { TrxId, UnitOfWork } from '@libs/unit-of-work';
import { Result } from '@libs/utils';
import { IdVO } from '@libs/value-objects';
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

    this.graph = {
      participants: {
        staff: true,
      },
    };
  }

  private readonly graph: object;

  async getOneById(id: IdVO): Promise<Result<TaskEntity, ExceptionBase>> {
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

  async create(entity: TaskEntity): Promise<Result<TaskEntity, ExceptionBase>> {
    const transaction = this.unitOfWork.getTrx(this.trxId);
    try {
      const ormEntity = this.mapper.toOrmEntity(entity);

      const task = await this.repository
        .query(transaction)
        .insertGraph(ormEntity);

      const taskOrmEntity = await this.repository
        .query(transaction)
        .findById(task.id)
        .withGraphFetched(this.graph);

      return Result.ok(this.mapper.toDomainEntity(taskOrmEntity));
    } catch (e) {
      return Result.fail(e);
    }
  }

  async update(entity: TaskEntity): Promise<Result<TaskEntity, ExceptionBase>> {
    const transaction = this.unitOfWork.getTrx(this.trxId);

    try {
      const ormEntity = this.mapper.toOrmEntity(entity);

      await this.repository.query(transaction).upsertGraphAndFetch(ormEntity);

      return Result.ok(entity);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
