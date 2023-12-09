import { WarehouseItemEntity } from '@modules/warehouse/domain';
import { ValueObject } from '@libs/base-classes/value-object.base';

export interface RepairPartVOProps {
  warehouseItem: WarehouseItemEntity;
  quantity: number;
}

export class RepairPartVO extends ValueObject<RepairPartVOProps> {}
