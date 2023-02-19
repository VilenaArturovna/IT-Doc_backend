import {
  CreateEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/base-classes';
import { OrderEntity, OrderEntityProps } from '@modules/order/domain';
import { OrderOrmEntity, OrderOrmEntityProps } from '../entities';
import { Currency, DateVO, MoneyVO } from '@libs/value-objects';
import { ClientOrmMapper } from '@modules/order/database/mappers/client.orm-mapper';
import { StaffOrmMapper } from '@modules/staff/database/mappers';
import { WorkOrmMapper } from '@modules/order/database/mappers/work.orm-mapper';
import { WarehouseItemOrmMapper } from '@modules/warehouse/database/mappers';

export class OrderOrmMapper extends OrmMapper<
  OrderEntity,
  OrderEntityProps,
  OrderOrmEntity
> {
  protected getEntityConstructor(ormEntity: OrderOrmEntity): {
    new (props: CreateEntityProps<OrderEntityProps>): OrderEntity;
  } {
    return OrderEntity;
  }

  protected getOrmEntityConstructor(entity: OrderEntity): {
    new (props: OrderOrmEntityProps): OrderOrmEntity;
  } {
    return OrderOrmEntity;
  }

  protected toDomainProps(ormEntity: OrderOrmEntity): OrderEntityProps {
    return {
      priority: ormEntity.priority,
      beneficiary: ormEntity.beneficiary,
      equipment: ormEntity.equipment,
      equipmentCondition: ormEntity.equipmentCondition,
      malfunction: ormEntity.malfunction,
      number: ormEntity.number,
      deadline: new DateVO(ormEntity.deadline),
      status: ormEntity.status,
      client: new ClientOrmMapper().toDomainEntity(ormEntity.client),
      responsibleStaff: ormEntity.responsibleStaff
        ? new StaffOrmMapper().toDomainEntity(ormEntity.responsibleStaff)
        : undefined,
      work: ormEntity.work
        ? new WorkOrmMapper().toDomainEntity(ormEntity.work)
        : undefined,
      price: MoneyVO.toVO({
        amount: ormEntity.price,
        currency: Currency.RUB,
      }),
      serialNumberEquipment: ormEntity.serialNumberEquipment,
      repairParts: ormEntity.repairParts
        ? ormEntity.repairParts.map((part) =>
            new WarehouseItemOrmMapper().toDomainEntity(part),
          )
        : undefined,
    };
  }

  protected toOrmProps(entity: OrderEntity): OrmEntityProps<OrderOrmEntity> {
    const props = entity.getCopiedProps();
    return {
      priority: props.priority,
      beneficiary: props.beneficiary,
      equipment: props.equipment,
      equipmentCondition: props.equipmentCondition,
      malfunction: props.malfunction,
      deadline: props.deadline.ISOString,
      status: props.status,
      number: props.number,
      clientId: props.client.id.value,
      responsibleStaffId: props.responsibleStaff
        ? props.responsibleStaff.id.value
        : undefined,
      workId: props.work ? props.work.id.value : null,
      price: props.price.amount,
      serialNumberEquipment: props.serialNumberEquipment ?? null,
      repairParts: props.repairParts
        ? props.repairParts.map((part) =>
            new WarehouseItemOrmMapper().toOrmEntity(part),
          )
        : null,
    };
  }
}
