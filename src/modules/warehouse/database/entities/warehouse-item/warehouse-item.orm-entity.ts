import { ModelBase, OrmEntityBase } from '@libs/base-classes';
import { Section, Unit } from '@modules/warehouse/types';
import {
  ProviderModel,
  ProviderOrmEntity,
  VendorModel,
  VendorOrmEntity,
} from '@modules/warehouse/database/entities';

export interface WarehouseItemOrmEntityProps {
  section: Section;
  partNumber?: string;
  title: string;
  compatibleModels?: string;
  unit: Unit;
  packing?: string;
  price: number;
  balance: number;
  expense?: number;
  expenseReserve?: number;
  criticalMargin: number;
  nextDeliveryDate?: string;
  vendorId: string;
  vendor?: VendorOrmEntity;
  providerId: string;
  provider?: ProviderOrmEntity;
  isArchived: boolean;
}

export class WarehouseItemOrmEntity
  extends OrmEntityBase<WarehouseItemOrmEntityProps>
  implements WarehouseItemOrmEntityProps
{
  section: Section;
  partNumber?: string;
  title: string;
  compatibleModels?: string;
  unit: Unit;
  packing?: string;
  price: number;
  balance: number;
  expense?: number;
  expenseReserve?: number;
  criticalMargin: number;
  nextDeliveryDate?: string;
  vendorId: string;
  vendor?: VendorOrmEntity;
  providerId: string;
  provider?: ProviderOrmEntity;
  isArchived: boolean;
}

export class WarehouseItemModel
  extends ModelBase
  implements WarehouseItemOrmEntity
{
  section: Section;
  partNumber?: string;
  title: string;
  compatibleModels?: string;
  unit: Unit;
  packing?: string;
  price: number;
  balance: number;
  expense?: number;
  expenseReserve?: number;
  criticalMargin: number;
  nextDeliveryDate?: string;
  vendor?: VendorModel;
  provider?: ProviderModel;
  isArchived: boolean;
  providerId: string;
  vendorId: string;
}
