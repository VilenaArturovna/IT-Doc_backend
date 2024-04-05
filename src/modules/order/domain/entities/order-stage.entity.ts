import { EntityBase } from '@libs/base-classes';
import { DateVO, IdVO } from '@libs/value-objects';
import { OrderStatus } from '@modules/order/types';

export interface OrderStageEntityProps {
  completedAt?: DateVO;
  deadline?: DateVO;
  number: number;
  status: OrderStatus;
}

export class OrderStageEntity extends EntityBase<OrderStageEntityProps> {
  protected readonly _id: IdVO;

  public static create(props: OrderStageEntityProps): OrderStageEntity {
    return new OrderStageEntity({ props });
  }

  protected validate() {}

  public get number() {
    return this.props.number;
  }

  public complete() {
    this.props.completedAt = DateVO.now();

    this.updatedAtNow();
    this.validate();
  }
}
