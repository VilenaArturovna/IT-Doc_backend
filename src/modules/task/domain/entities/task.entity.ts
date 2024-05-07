import { EntityBase } from '@libs/base-classes';
import { ConflictException, ForbiddenException } from '@libs/exceptions';
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

  public takeToWork(staffId: IdVO) {
    if (this.props.status !== TaskStatus.REGISTERED) {
      throw new ConflictException('Задача уже в работе или выполнена');
    }

    const responsibleParticipant = this.props.participants.find(
      (p) => p.isResponsible,
    );
    const hasResponsibleStaff = Boolean(responsibleParticipant);

    if (
      hasResponsibleStaff &&
      !staffId.equals(responsibleParticipant.staff.id)
    ) {
      throw new ForbiddenException('Вы не являетесь исполнителем задачи');
    }

    if (hasResponsibleStaff) {
      this.props.participants
        .filter((p) => !p.id.equals(responsibleParticipant.id))
        .forEach((p) => p.markUnread());

      this.props.participants.push(responsibleParticipant);
    }

    if (!hasResponsibleStaff) {
      const participant = this.props.participants.find((p) =>
        p.staff.id.equals(staffId),
      );
      participant.makeResponsible();

      this.props.participants = this.props.participants.filter(
        (p) => !p.id.equals(participant.id),
      );
      this.props.participants.forEach((p) => p.markUnread());
      this.props.participants.push(participant);
    }

    this.props.status = TaskStatus.IN_WORK;

    this.updatedAt;
    this.validate();
  }

  public addComment(comment: string, staffId: IdVO) {
    if (this.props.status === TaskStatus.COMPLETED) {
      throw new ConflictException('Задача уже выполнена');
    }

    const participant = this.props.participants.find((p) =>
      p.staff.id.equals(staffId),
    );

    participant.comment = comment;

    this.props.participants = this.props.participants.filter(
      (p) => !p.id.equals(participant.id),
    );
    this.props.participants.forEach((p) => p.markUnread());
    this.props.participants.push(participant);

    this.updatedAt;
    this.validate();
  }

  protected validate() {}
}
