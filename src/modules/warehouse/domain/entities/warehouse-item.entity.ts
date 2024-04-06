import { EntityBase } from '@libs/base-classes';
import { DateVO, IdVO, MoneyVO } from '@libs/value-objects';
import {
  ProviderEntity,
  VendorEntity,
  WarehouseItemHasEmptyFieldsError,
} from '@modules/warehouse/domain';
import { Section, Unit } from '@modules/warehouse/types';

export interface WarehouseItemEntityProps {
  section: Section;
  partNumber?: string;
  title: string;
  //совместимые модели (строка)
  compatibleModels?: string;
  unit: Unit;
  //упаковка
  packing?: string;
  price: MoneyVO;
  //остаток единиц на складе
  balance: number;
  //расход для тонера
  expense?: number;
  //резервное количетсво
  expenseReserve?: number;
  //критический запас
  criticalMargin: number;
  nextDeliveryDate?: DateVO;
  vendor: VendorEntity;
  provider: ProviderEntity;
  isArchived: boolean;
}

export type UpdateWarehouseItemEntityProps = Omit<
  WarehouseItemEntityProps,
  'unit' | 'section' | 'isArchived'
>;

export class WarehouseItemEntity extends EntityBase<WarehouseItemEntityProps> {
  protected readonly _id: IdVO;

  public static create(props: WarehouseItemEntityProps): WarehouseItemEntity {
    return new WarehouseItemEntity({ props });
  }

  public get price() {
    return this.props.price;
  }

  public update(props: UpdateWarehouseItemEntityProps) {
    this.props.vendor = props.vendor;
    this.props.provider = props.provider;
    this.props.price = props.price;
    this.props.expense = props.expense;
    this.props.expenseReserve = props.expenseReserve;
    this.props.packing = props.packing;
    this.props.partNumber = props.partNumber;
    this.props.compatibleModels = props.compatibleModels;
    this.props.nextDeliveryDate = props.nextDeliveryDate;
    this.props.criticalMargin = props.criticalMargin;
    this.props.balance = props.balance;
    this.props.title = props.title;
    this.validate();
    this.updatedAtNow();
  }

  public archive() {
    this.props.isArchived = true;
    this.updatedAtNow();
  }

  protected validate() {
    const {
      section,
      title,
      unit,
      price,
      balance,
      criticalMargin,
      vendor,
      provider,
    } = this.props;

    const requiredFields = [
      section,
      title,
      unit,
      price,
      balance,
      vendor,
      provider,
      criticalMargin,
    ];
    if (requiredFields.some((f) => f === null || f === undefined)) {
      throw new WarehouseItemHasEmptyFieldsError();
    }
  }
}
