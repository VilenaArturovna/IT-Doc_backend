import { EntityBase } from '@libs/base-classes';
import { IdVO } from '@libs/value-objects';
import { OrderStatus } from '@modules/order/types';

export interface DeadlineEntityProps {
  name: OrderStatus;
  normal: number;
  urgent: number;
}

export type UpdateDeadlineEntityProps = Omit<DeadlineEntityProps, 'name'>;

export class DeadlineEntity extends EntityBase<DeadlineEntityProps> {
  protected readonly _id: IdVO;

  public static create(props: DeadlineEntityProps): DeadlineEntity {
    return new DeadlineEntity({ props });
  }

  protected validate() {}

  public update(props: UpdateDeadlineEntityProps) {
    this.props.normal = props.normal;
    this.props.urgent = props.urgent;
    this.updatedAtNow();
    this.validate();
  }
}
