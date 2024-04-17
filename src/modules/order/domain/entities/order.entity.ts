import { EntityBase } from '@libs/base-classes';
import { MoneyCalculator } from '@libs/utils';
import { DateVO, IdVO, MoneyVO } from '@libs/value-objects';
import {
  ClientEntity,
  OrderStageEntity,
  WorkEntity,
} from '@modules/order/domain';
import { CheckCodeVO, RepairPartVO } from '@modules/order/domain/value-objects';
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
  works?: WorkEntity[];
  client: ClientEntity;
  beneficiary: Beneficiary; //выгодоприобретатель
  price: MoneyVO;
  repairParts?: RepairPartVO[];
  stages: OrderStageEntity[];
  checkCode: CheckCodeVO;
  isPaid: boolean;
}

type EndDiagnosticProps = Pick<
  OrderEntityProps,
  'repairParts' | 'deadline' | 'equipmentCondition' | 'works'
>;

interface UpdateOrderProps {
  comment?: string;
  deadline?: DateVO;
  responsibleStaff?: StaffEntity;
  price?: MoneyVO;
  beneficiary?: Beneficiary;
  isPaid?: boolean;
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

  public endDiagnostic(props: EndDiagnosticProps, margin: number) {
    this.props.status = OrderStatus.DIAGNOSED;
    this.props.deadline = props.deadline;
    this.props.equipmentCondition = props.equipmentCondition;
    this.props.works = props.works;
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

  private addNewStage(
    status: OrderStatus,
    deadline?: DateVO,
    comment?: string,
  ) {
    this.completeLastStage();
    this.props.stages.push(
      OrderStageEntity.create({
        status,
        number: this.props.stages.length + 1,
        deadline,
        comment,
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

    if (this.props.works?.length) {
      this.props.works.forEach((work) => calculator.plus(work.price));
    }

    // добавление НДС
    calculator.multiplyOnPercent(
      this.props.beneficiary === Beneficiary.OOO ? 120 : 106,
    );

    this.props.price = calculator.result();
  }

  public update(props: UpdateOrderProps) {
    this.props.isPaid = props.isPaid ?? this.props.isPaid;
    this.props.deadline = props.deadline ?? this.props.deadline;
    this.props.beneficiary = props.beneficiary ?? this.props.beneficiary;
    this.props.responsibleStaff =
      props.responsibleStaff ?? this.props.responsibleStaff;
    this.props.price = props.price ?? this.props.price;

    props.comment &&
      this.addNewStage(this.props.status, this.props.deadline, props.comment);
    this.validate();
  }
}
