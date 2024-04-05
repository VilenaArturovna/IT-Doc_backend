import { ModelBase, OrmEntityBase } from '@libs/base-classes';
import {
  ClientOrmEntity,
  OrderStageOrmEntity,
  WorkOrmEntity,
} from '@modules/order/database/entities';
import { Beneficiary, OrderStatus, Priority } from '@modules/order/types';
import { StaffOrmEntity } from '@modules/staff/database/entities';
import { WarehouseItemOrmEntity } from '@modules/warehouse/database/entities';

export interface OrderOrmEntityProps {
  priority: Priority;
  status: OrderStatus;
  deadline: string;
  number?: string;
  responsibleStaff?: StaffOrmEntity;
  responsibleStaffId?: string;
  equipment: string;
  equipmentCondition: string;
  serialNumberEquipment?: string;
  malfunction: string;
  work?: WorkOrmEntity;
  workId?: string;
  client?: ClientOrmEntity;
  clientId: string;
  beneficiary: Beneficiary;
  price: number;
  repairParts?: WarehouseItemOrmEntity[];
  stages: OrderStageOrmEntity[];
}

export class OrderOrmEntity
  extends OrmEntityBase<OrderOrmEntityProps>
  implements OrderOrmEntityProps
{
  priority: Priority;
  status: OrderStatus;
  deadline: string;
  number?: string;
  responsibleStaff?: StaffOrmEntity;
  responsibleStaffId?: string;
  equipment: string;
  equipmentCondition: string;
  serialNumberEquipment?: string;
  malfunction: string;
  work?: WorkOrmEntity;
  workId?: string;
  client?: ClientOrmEntity;
  clientId: string;
  beneficiary: Beneficiary;
  price: number;
  repairParts?: WarehouseItemOrmEntity[];
  stages: OrderStageOrmEntity[];
}

export class OrderModel extends ModelBase implements OrderOrmEntity {
  priority: Priority;
  status: OrderStatus;
  deadline: string;
  number?: string;
  responsibleStaff?: StaffOrmEntity;
  responsibleStaffId?: string;
  equipment: string;
  equipmentCondition: string;
  serialNumberEquipment?: string;
  malfunction: string;
  work?: WorkOrmEntity;
  workId?: string;
  client?: ClientOrmEntity;
  clientId: string;
  beneficiary: Beneficiary;
  price: number;
  repairParts?: WarehouseItemOrmEntity[];
  stages: OrderStageOrmEntity[];
}
