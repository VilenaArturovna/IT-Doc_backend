import { ValueObject } from '@libs/base-classes/value-object.base';
import { DomainException } from '@libs/exceptions';
import { MoneyCalculator } from '@libs/utils';
import { Currency, MoneyVO } from '@libs/value-objects';
import { WarehouseItemEntity } from '@modules/warehouse/domain';

export interface RepairPartVOProps {
  warehouseItem: WarehouseItemEntity;
  quantity: number;
  cost: MoneyVO;
}

export interface RepairPartPrimitiveProps {
  warehouseItemId: string;
  quantity: number;
  cost: string;
  warehouseItem?: WarehouseItemEntity;
}

export class RepairPartVO extends ValueObject<RepairPartVOProps> {
  constructor(props: RepairPartVOProps) {
    super(props);
    this.validate();
  }

  public static toJSON(props: RepairPartVO): RepairPartPrimitiveProps {
    return {
      cost: props.cost.amount,
      quantity: props.props.quantity,
      warehouseItemId: props.props.warehouseItem.id.value,
      warehouseItem: props.props.warehouseItem,
    };
  }

  public static toVO(props: RepairPartPrimitiveProps): RepairPartVO {
    return new RepairPartVO({
      cost: new MoneyVO({
        amount: props.cost,
        currency: Currency.RUB,
      }),
      quantity: props.quantity,
      warehouseItem: props.warehouseItem,
    });
  }

  public get cost() {
    return this.props.cost;
  }

  public get quantity() {
    return this.props.quantity;
  }

  public get warehouseItem() {
    return this.props.warehouseItem;
  }

  private validate() {
    const cost = new MoneyCalculator(Currency.RUB)
      .plus(this.props.warehouseItem.price)
      .multiply(this.props.quantity)
      .result();

    if (!cost.equals(this.props.cost)) {
      throw new DomainException('The calculated cost differs from the cost');
    }
  }
}
