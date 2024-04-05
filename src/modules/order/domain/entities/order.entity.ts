import { EntityBase } from '@libs/base-classes';
import { DateVO, IdVO, MoneyVO } from '@libs/value-objects';
import {
  ClientEntity,
  OrderStageEntity,
  WorkEntity,
} from '@modules/order/domain';
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
  stages: OrderStageEntity[];
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

    this.addNewStage(this.props.status, deadline);

    this.updatedAtNow();
    this.validate();
  }

  public startDiagnostic(deadline: DateVO) {
    this.props.status = OrderStatus.DIAGNOSTIC;
    this.props.deadline = deadline;

    this.addNewStage(this.props.status, deadline);

    this.updatedAtNow();
    this.validate();
  }

  public endDiagnostic(props: EndDiagnosticProps) {
    this.props.status = OrderStatus.DIAGNOSED;
    this.props.deadline = props.deadline;
    this.props.equipmentCondition = props.equipmentCondition;
    this.props.work = props.work;
    this.props.repairParts = props.repairParts;

    this.addNewStage(this.props.status, props.deadline);

    this.updatedAtNow();
    this.validate();
  }

  public takeToWork(deadline: DateVO) {
    this.props.status = OrderStatus.IN_PROGRESS;
    this.props.deadline = deadline;

    this.addNewStage(this.props.status, deadline);

    this.updatedAtNow();
    this.validate();
  }

  private get lastStage() {
    return this.props.stages.sort((a, b) => a.number - b.number)[
      this.props.stages.length - 1
    ];
  }

  private completeLastStage() {
    const lastStage = this.lastStage;
    lastStage.complete();

    this.props.stages = this.props.stages
      .filter((stage) => !stage.id.equals(lastStage.id))
      .concat([lastStage]);

    this.updatedAtNow();
    this.validate();
  }

  private addNewStage(status: OrderStatus, deadline?: DateVO) {
    this.completeLastStage();
    this.props.stages.push(
      OrderStageEntity.create({
        status,
        number: this.props.stages.length + 1,
        deadline,
      }),
    );
  }
}
