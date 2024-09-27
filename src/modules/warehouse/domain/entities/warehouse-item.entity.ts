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

export type CreateWarehouseItemEntityProps = Omit<
  WarehouseItemEntityProps,
  'isArchived'
>;

export class WarehouseItemEntity extends EntityBase<WarehouseItemEntityProps> {
  protected readonly _id: IdVO;

  public static create(
    props: CreateWarehouseItemEntityProps,
  ): WarehouseItemEntity {
    return new WarehouseItemEntity({ props: { ...props, isArchived: false } });
  }

  public get price() {
    return this.props.price;
  }

  public get balance() {
    return this.props.balance;
  }

  public get title() {
    return this.props.title;
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

  public reserve(quantity: number) {
    this.props.balance =
      Math.round((this.props.balance - quantity) * 1000) / 1000;
  }

  public cancelReservation(quantity: number) {
    this.props.balance =
      Math.round((this.props.balance + quantity) * 1000) / 1000;
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
