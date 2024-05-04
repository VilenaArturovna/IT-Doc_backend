import {
  CreateEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/base-classes';
import { Currency, DateVO, MoneyVO } from '@libs/value-objects';
import { TaskStaffOrmMapper } from '@modules/task/database';
import { TaskEntity, TaskEntityProps } from '@modules/task/domain';

import { TaskOrmEntity, TaskOrmEntityProps } from '../entities';

export class TaskOrmMapper extends OrmMapper<
  TaskEntity,
  TaskEntityProps,
  TaskOrmEntity
> {
  protected getEntityConstructor(): {
    new (props: CreateEntityProps<TaskEntityProps>): TaskEntity;
  } {
    return TaskEntity;
  }

  protected getOrmEntityConstructor(): {
    new (props: TaskOrmEntityProps): TaskOrmEntity;
  } {
    return TaskOrmEntity;
  }

  protected toDomainProps(ormEntity: TaskOrmEntity): TaskEntityProps {
    return {
      number: ormEntity.number,
      deadline: ormEntity.deadline ? new DateVO(ormEntity.deadline) : undefined,
      description: ormEntity.description,
      price: ormEntity.price
        ? new MoneyVO({ currency: Currency.RUB, amount: ormEntity.price })
        : undefined,
      status: ormEntity.status,
      theme: ormEntity.theme,
      participants: ormEntity.participants?.map((p) =>
        new TaskStaffOrmMapper().toDomainEntity(p),
      ),
    };
  }

  protected toOrmProps(entity: TaskEntity): OrmEntityProps<TaskOrmEntity> {
    const props = entity.getCopiedProps();
    return {
      theme: props.theme,
      status: props.status,
      price: props.price ? props.price.amount : null,
      number: props.number,
      deadline: props.deadline ? props.deadline.ISOString : null,
      description: props.description,
      participants: props.participants?.map((p) => ({
        ...new TaskStaffOrmMapper().toOrmEntity(p),
        taskId: props.id.value,
      })),
    };
  }
}
