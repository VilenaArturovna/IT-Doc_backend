import { EntityBase } from '@libs/base-classes';
import { DateVO, IdVO, MoneyVO } from '@libs/value-objects';
import { ClientEntity, WorkEntity } from '@modules/order/domain';
import { Beneficiary, OrderStatus, Priority } from '@modules/order/types';
import { StaffEntity } from '@modules/staff/domain';
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

interface EndDiagnosticProps {
  price?: MoneyVO;
  repairParts?: WarehouseItemEntity[];
  deadline: DateVO;
  equipmentCondition: string;
  work: WorkEntity;
}

export class OrderEntity extends EntityBase<OrderEntityProps> {
  protected readonly _id: IdVO;

  public static create(props: OrderEntityProps): OrderEntity {
    return new OrderEntity({ props });
  }

  protected validate() {}

  public get priority() {
    return this.props.priority;
  }

  public putInQueueForDiagnostics(deadline: DateVO) {
    this.props.status = OrderStatus.IN_DIAGNOSTICS_QUEUE;
    this.props.deadline = deadline;

    this.updatedAtNow();
    this.validate();
  }

  public startDiagnostic(deadline: DateVO) {
    this.props.status = OrderStatus.DIAGNOSTIC;
    this.props.deadline = deadline;

    this.updatedAtNow();
    this.validate();
  }

  public endDiagnostic(props: EndDiagnosticProps) {
    this.props.status = OrderStatus.DIAGNOSED;
    this.props.deadline = props.deadline;
    this.props.equipmentCondition = props.equipmentCondition;
    this.props.work = props.work;

    this.updatedAtNow();
    this.validate();
  }
}
