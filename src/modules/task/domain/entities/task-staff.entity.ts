import { EntityBase } from '@libs/base-classes';
import { IdVO } from '@libs/value-objects';
import { StaffEntity } from '@modules/staff/domain';

export interface TaskStaffEntityProps {
  staff: StaffEntity;
  comment?: string;
  isResponsible: boolean;
  isAuthor: boolean;
  isRead: boolean;
}

export class TaskStaffEntity extends EntityBase<TaskStaffEntityProps> {
  protected readonly _id: IdVO;

  public static create(props: TaskStaffEntityProps): TaskStaffEntity {
    return new TaskStaffEntity({ props });
  }

  protected validate() {}
}
