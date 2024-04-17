import { EntityBase } from '@libs/base-classes';
import { MoneyCalculator } from '@libs/utils';
import { DateVO, IdVO, MoneyVO } from '@libs/value-objects';
import {
  ClientEntity,
  OrderStageEntity,
  WorkEntity,
} from '@modules/order/domain';
import { RepairPartVO } from '@modules/order/domain/value-objects';
import { Beneficiary, OrderStatus, Priority } from '@modules/order/types';
import { StaffEntity } from '@modules/staff/domain';

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
  repairParts?: RepairPartVO[];
  stages: OrderStageEntity[];
}

type EndDiagnosticProps = Pick<
  OrderEntityProps,
  'repairParts' | 'deadline' | 'equipmentCondition' | 'work'
>;

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

  public endDiagnostic(props: EndDiagnosticProps, margin: number) {
    this.props.status = OrderStatus.DIAGNOSED;
    this.props.deadline = props.deadline;
    this.props.equipmentCondition = props.equipmentCondition;
    this.props.work = props.work;
    this.props.repairParts = props.repairParts;

    this.calculatePrice(margin);
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

  private calculatePrice(margin: number) {
    const calculator = MoneyCalculator.fromRUB();

    if (this.props.repairParts?.length) {
      this.props.repairParts.forEach((part) => {
        calculator.plus(part.cost);
      });
    }

    calculator.multiplyOnPercent(margin);

    if (this.props.work) {
      calculator.plus(this.props.work.price);
    }

    calculator.multiplyOnPercent(
      this.props.beneficiary === Beneficiary.OOO ? 120 : 106,
    );

    this.props.price = calculator.result();
  }
}
