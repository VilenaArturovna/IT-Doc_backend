import { EntityBase } from '@libs/base-classes';
import { IdVO, MoneyVO } from '@libs/value-objects';
import { WorkPriority } from '@modules/order/types';

export interface WorkEntityProps {
  name: string;
  price: MoneyVO;
  //in minutes
  time: number;
  priority: WorkPriority;
}

export class WorkEntity extends EntityBase<WorkEntityProps> {
  protected readonly _id: IdVO;

  public static create(props: WorkEntityProps): WorkEntity {
    return new WorkEntity({ props });
  }

  protected validate() {}
}
