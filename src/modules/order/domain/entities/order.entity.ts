import { EntityBase } from '@libs/base-classes';
import { ConflictException } from '@libs/exceptions';
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
  refusalToRepair?: boolean;
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
  margin?: number;
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
    if (this.props.status !== OrderStatus.IN_DIAGNOSTICS_QUEUE) {
      throw new ConflictException(
        'Чтобы поставить оборудование в очередь на диагностику, заявка должна быть зарегистрирована',
      );
    }

    this.props.status = OrderStatus.IN_DIAGNOSTICS_QUEUE;
    this.props.deadline = deadline;

    this.addNewStage(this.props.status, deadline);

    this.updatedAtNow();
    this.validate();
  }

  public startDiagnostic(deadline: DateVO) {
    if (this.props.status !== OrderStatus.IN_DIAGNOSTICS_QUEUE) {
      throw new ConflictException(
        'Для начала диагностики необходимо сначала поставить оборудование в очередь на диагностику',
      );
    }

    this.props.status = OrderStatus.DIAGNOSTIC;
    this.props.deadline = deadline;

    this.addNewStage(this.props.status, deadline);

    this.updatedAtNow();
    this.validate();
  }

  public endDiagnostic(props: EndDiagnosticProps, margin: number) {
    if (this.props.status !== OrderStatus.DIAGNOSTIC) {
      throw new ConflictException(
        'Для завершения диагностики необходимо сначала взять на диагностику оборудование',
      );
    }

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
    if (
      ![
        OrderStatus.APPROVED,
        OrderStatus.APPROVED_AND_SPARE_PART_IS_ORDERED,
      ].includes(this.props.status)
    ) {
      throw new ConflictException(
        'Чтобы начать работы по заявке, необходимо сначала ее согласовать',
      );
    }

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
    this.props.responsibleStaff =
      props.responsibleStaff ?? this.props.responsibleStaff;
    this.props.price = props.price ?? this.props.price;

    if (this.props.beneficiary !== props.beneficiary) {
      this.props.beneficiary = props.beneficiary;

      if (!props.price) {
        this.calculatePrice(props.margin);
      }
    }

    props.comment &&
      this.addNewStage(this.props.status, this.props.deadline, props.comment);
    this.validate();
    this.updatedAtNow();
  }

  public approve(status: OrderStatus, deadline: DateVO) {
    if (this.props.status !== OrderStatus.DIAGNOSED) {
      throw new ConflictException(
        'Для согласования оборудование должно быть продиагностировано',
      );
    }

    this.props.status = status;
    this.props.deadline = deadline;

    this.addNewStage(this.props.status, this.props.deadline);

    this.validate();
    this.updatedAtNow();
  }

  public ready(refusalToRepair?: boolean) {
    if (
      ![OrderStatus.IN_PROGRESS, OrderStatus.DIAGNOSED].includes(
        this.props.status,
      )
    ) {
      throw new ConflictException(
        'Заявка должна быть в работе или продиагностирована',
      );
    }

    //TODO deadline??
    this.props.status = OrderStatus.READY;
    this.props.refusalToRepair = refusalToRepair ?? false;

    if (refusalToRepair) {
      this.props.repairParts.forEach((part) =>
        part.warehouseItem.cancelReservation(part.quantity),
      );
    }

    this.addNewStage(this.props.status);

    this.validate();
    this.updatedAtNow();
  }

  public complete() {
    if (this.props.status !== OrderStatus.READY) {
      throw new ConflictException('Завершить можно только готовую заявку');
    }

    //TODO deadline??
    this.props.status = OrderStatus.COMPLETED;

    this.addNewStage(this.props.status);

    this.validate();
    this.updatedAtNow();
  }
}
