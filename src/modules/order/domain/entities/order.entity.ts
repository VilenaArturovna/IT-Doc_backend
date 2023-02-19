import { EntityBase } from '@libs/base-classes';
import { DateVO, IdVO, MoneyVO } from '@libs/value-objects';
import { Beneficiary, OrderStatus, Priority } from '@modules/order/types';
import { StaffEntity } from '@modules/staff/domain';
import { ClientEntity, WorkEntity } from '@modules/order/domain';
import { WarehouseItemEntity } from '@modules/warehouse/domain';

export interface OrderEntityProps {
  priority: Priority;
  status: OrderStatus;
  deadline: DateVO;
  number?: string;
  responsibleStaff?: StaffEntity;
  equipment: string; //оборудование
  equipmentCondition: string; //Состояние оборудования
  serialNumberEquipment?: string;
  malfunction: string; //неисправность
  work?: WorkEntity;
  client: ClientEntity;
  beneficiary: Beneficiary; //выгодоприобретатель
  price: MoneyVO;
  repairParts?: WarehouseItemEntity[];
}

export class OrderEntity extends EntityBase<OrderEntityProps> {
  protected readonly _id: IdVO;

  public static create(props: OrderEntityProps): OrderEntity {
    return new OrderEntity({ props });
  }

  protected validate() {}
}
