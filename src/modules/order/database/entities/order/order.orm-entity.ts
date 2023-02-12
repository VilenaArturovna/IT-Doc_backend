import { ModelBase, OrmEntityBase } from '@libs/base-classes';
import { Beneficiary, OrderStatus } from '@modules/order/types';
import { StaffOrmEntity } from '@modules/staff/database/entities';
import {
  ClientOrmEntity,
  WorkOrmEntity,
} from '@modules/order/database/entities';
import { WarehouseItemOrmEntity } from '@modules/warehouse/database/entities';

export interface OrderOrmEntityProps {
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
}

export class OrderOrmEntity
  extends OrmEntityBase<OrderOrmEntityProps>
  implements OrderOrmEntityProps
{
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
}

export class OrderModel extends ModelBase implements OrderOrmEntity {
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
}
