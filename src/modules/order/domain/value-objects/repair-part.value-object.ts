import { ValueObject } from '@libs/base-classes/value-object.base';
import { WarehouseItemEntity } from '@modules/warehouse/domain';

export interface RepairPartVOProps {
  warehouseItem: WarehouseItemEntity;
  quantity: number;
}

export class RepairPartVO extends ValueObject<RepairPartVOProps> {}
