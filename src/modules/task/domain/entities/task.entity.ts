import { EntityBase } from '@libs/base-classes';
import { DateVO, IdVO, MoneyVO } from '@libs/value-objects';
import { TaskStaffEntity } from '@modules/task/domain';
import { TaskStatus } from '@modules/task/types';

export interface TaskEntityProps {
  theme: string;
  number?: string;
  description: string;
  status: TaskStatus;
  deadline?: DateVO;
  price?: MoneyVO;
  participants: TaskStaffEntity[];
}

export class TaskEntity extends EntityBase<TaskEntityProps> {
  protected readonly _id: IdVO;

  public static create(props: TaskEntityProps): TaskEntity {
    return new TaskEntity({ props });
  }

  public get status() {
    return this.props.status;
  }

  public addParticipants(participants: TaskStaffEntity[]) {
    this.props.participants = this.props.participants.concat(participants);
  }

  protected validate() {}
}
