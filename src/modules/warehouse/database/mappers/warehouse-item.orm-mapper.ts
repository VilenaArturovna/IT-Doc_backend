import {
  CreateEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/base-classes';
import {
  WarehouseItemEntity,
  WarehouseItemEntityProps,
} from '@modules/warehouse/domain';
import {
  WarehouseItemOrmEntity,
  WarehouseItemOrmEntityProps,
} from '../entities';
import { Currency, DateVO, MoneyVO } from '@libs/value-objects';
import { VendorOrmMapper } from '@modules/warehouse/database/mappers/vendor.orm-mapper';
import { ProviderOrmMapper } from '@modules/warehouse/database/mappers/provider.orm-mapper';
import { ServiceOrmMapper } from '@modules/warehouse/database/mappers/service.orm-mapper';

export class WarehouseItemOrmMapper extends OrmMapper<
  WarehouseItemEntity,
  WarehouseItemEntityProps,
  WarehouseItemOrmEntity
> {
  protected getEntityConstructor(ormEntity: WarehouseItemOrmEntity): {
    new (
      props: CreateEntityProps<WarehouseItemEntityProps>,
    ): WarehouseItemEntity;
  } {
    return WarehouseItemEntity;
  }

  protected getOrmEntityConstructor(entity: WarehouseItemEntity): {
    new (props: WarehouseItemOrmEntityProps): WarehouseItemOrmEntity;
  } {
    return WarehouseItemOrmEntity;
  }

  protected toDomainProps(
    ormEntity: WarehouseItemOrmEntity,
  ): WarehouseItemEntityProps {
    return {
      title: ormEntity.title,
      section: ormEntity.section,
      unit: ormEntity.unit,
      balance: ormEntity.balance,
      criticalMargin: ormEntity.criticalMargin,
      price: MoneyVO.toVO({ amount: ormEntity.price, currency: Currency.RUR }),
      expense: ormEntity.expense,
      expenseReserve: ormEntity.expenseReserve,
      packing: ormEntity.packing,
      partNumber: ormEntity.partNumber,
      compatibleModels: ormEntity.compatibleModels,
      isArchived: ormEntity.isArchived,
      nextDeliveryDate: ormEntity.nextDeliveryDate
        ? new DateVO(ormEntity.nextDeliveryDate)
        : undefined,
      vendor: new VendorOrmMapper().toDomainEntity(ormEntity.vendor),
      provider: new ProviderOrmMapper().toDomainEntity(ormEntity.provider),
      service: ormEntity.service
        ? new ServiceOrmMapper().toDomainEntity(ormEntity.service)
        : undefined,
    };
  }

  protected toOrmProps(
    entity: WarehouseItemEntity,
  ): OrmEntityProps<WarehouseItemOrmEntity> {
    const props = entity.getCopiedProps();
    return {
      title: props.title,
      unit: props.unit,
      price: props.price.amount,
      balance: props.balance,
      criticalMargin: props.criticalMargin,
      packing: props.packing ?? null,
      partNumber: props.partNumber ?? null,
      section: props.section,
      expense: props.expense ?? null,
      nextDeliveryDate: props.nextDeliveryDate
        ? props.nextDeliveryDate.ISOString
        : null,
      compatibleModels: props.compatibleModels ?? null,
      expenseReserve: props.expenseReserve ?? null,
      isArchived: props.isArchived,
      vendorId: props.vendor.id.value,
      providerId: props.provider.id.value,
      serviceId: props.service?.id.value,
    };
  }
}
