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

  public get staffId() {
    return this.props.staff.id;
  }

  public get isResponsible() {
    return this.props.isResponsible;
  }

  public get isAuthor() {
    return this.props.isAuthor;
  }

  public get staffTgId(): string | undefined {
    return this.props.staff.tgId;
  }

  public makeResponsible() {
    this.props.isResponsible = true;

    this.updatedAt;
    this.validate();
  }

  public markAsUnread() {
    this.props.isRead = false;

    this.updatedAt;
    this.validate();
  }

  public set comment(comment: string) {
    this.props.comment = comment;

    this.updatedAt;
    this.validate();
  }

  public markAsRead() {
    this.props.isRead = true;

    this.updatedAt;
    this.validate();
  }

  protected validate() {}
}
