import {
  CreateEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/base-classes';
import { StaffOrmMapper } from '@modules/staff/database/mappers';
import { TaskStaffEntity, TaskStaffEntityProps } from '@modules/task/domain';

import { TaskStaffOrmEntity, TaskStaffOrmEntityProps } from '../entities';

export class TaskStaffOrmMapper extends OrmMapper<
  TaskStaffEntity,
  TaskStaffEntityProps,
  TaskStaffOrmEntity
> {
  protected getEntityConstructor(): {
    new (props: CreateEntityProps<TaskStaffEntityProps>): TaskStaffEntity;
  } {
    return TaskStaffEntity;
  }

  protected getOrmEntityConstructor(): {
    new (props: TaskStaffOrmEntityProps): TaskStaffOrmEntity;
  } {
    return TaskStaffOrmEntity;
  }

  protected toDomainProps(ormEntity: TaskStaffOrmEntity): TaskStaffEntityProps {
    return {
      comment: ormEntity.comment,
      isAuthor: ormEntity.isAuthor,
      isRead: ormEntity.isRead,
      isResponsible: ormEntity.isResponsible,
      staff: ormEntity.staff
        ? new StaffOrmMapper().toDomainEntity(ormEntity.staff)
        : undefined,
    };
  }

  protected toOrmProps(
    entity: TaskStaffEntity,
  ): OrmEntityProps<TaskStaffOrmEntity> {
    const props = entity.getCopiedProps();
    return {
      comment: props.comment,
      isResponsible: props.isResponsible,
      isRead: props.isRead,
      isAuthor: props.isAuthor,
      staffId: props.staff.id.value,
      taskId: '',
    };
  }
}
