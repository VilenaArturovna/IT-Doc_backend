import { EntityBase } from '@libs/base-classes';
import { IdVO, MoneyVO } from '@libs/value-objects';
import { WorkHasEmptyFieldsError } from '@modules/order/domain/errors';

export interface WorkEntityProps {
  name: string;
  price: MoneyVO;
  time: number; //in minutes
}

export class WorkEntity extends EntityBase<WorkEntityProps> {
  protected readonly _id: IdVO;

  public static create(props: WorkEntityProps): WorkEntity {
    return new WorkEntity({ props });
  }

  public update(props: WorkEntityProps) {
    this.props.name = props.name;
    this.props.price = props.price;
    this.props.time = props.time;
    this.updatedAtNow();
    this.validate();
  }

  protected validate() {
    const { price, time, name } = this.props;

    const requiredFields = [price, name, time];

    if (requiredFields.some((f) => f === null || f === undefined)) {
      throw new WorkHasEmptyFieldsError();
    }
  }
}
