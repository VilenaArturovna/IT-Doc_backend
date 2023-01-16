import { EntityBase } from '@libs/base-classes';
import { IdVO, MoneyVO } from '@libs/value-objects';
import { ServiceHasEmptyFieldsError } from '@modules/warehouse/domain';

export interface ServiceEntityProps {
  title: string;
  description?: string;
  cost: MoneyVO;
}

export class ServiceEntity extends EntityBase<ServiceEntityProps> {
  protected readonly _id: IdVO;

  public static create(props: ServiceEntityProps): ServiceEntity {
    return new ServiceEntity({ props });
  }

  public update(props: ServiceEntityProps) {
    this.props.title = props.title;
    this.props.description = props.description;
    this.props.cost = props.cost;
    this.updatedAtNow();
  }

  protected validate() {
    const { title, cost } = this.props;

    if (!title && !cost) {
      throw new ServiceHasEmptyFieldsError();
    }
  }
}
