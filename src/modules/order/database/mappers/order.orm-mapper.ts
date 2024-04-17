import {
  CreateEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/base-classes';
import { Currency, DateVO, MoneyVO } from '@libs/value-objects';
import { ClientOrmMapper } from '@modules/order/database/mappers/client.orm-mapper';
import { OrderStageOrmMapper } from '@modules/order/database/mappers/order-stage.orm-mapper';
import { WorkOrmMapper } from '@modules/order/database/mappers/work.orm-mapper';
import { OrderEntity, OrderEntityProps } from '@modules/order/domain';
import { CheckCodeVO, RepairPartVO } from '@modules/order/domain/value-objects';
import { StaffOrmMapper } from '@modules/staff/database/mappers';
import { WarehouseItemOrmMapper } from '@modules/warehouse/database/mappers';

import { OrderOrmEntity, OrderOrmEntityProps } from '../entities';

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
      works: ormEntity.works?.length
        ? ormEntity.works.map((work) =>
            new WorkOrmMapper().toDomainEntity(work),
          )
        : undefined,
      price: MoneyVO.toVO({
        amount: ormEntity.price,
        currency: Currency.RUB,
      }),
      serialNumberEquipment: ormEntity.serialNumberEquipment,
      repairParts: ormEntity.repairParts
        ? ormEntity.repairParts.map((part) =>
            RepairPartVO.toVO({
              ...part,
              warehouseItem: new WarehouseItemOrmMapper().toDomainEntity(
                part.warehouseItem,
              ),
            }),
          )
        : undefined,
      stages: ormEntity.stages.map((stage) =>
        new OrderStageOrmMapper().toDomainEntity(stage),
      ),
      checkCode: new CheckCodeVO(ormEntity.checkCode),
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
      price: props.price.amount,
      serialNumberEquipment: props.serialNumberEquipment ?? null,
      repairParts: props.repairParts
        ? props.repairParts.map((part) => {
            const repairPartProps = RepairPartVO.toJSON(part);
            return {
              orderId: props.id.value,
              cost: repairPartProps.cost,
              quantity: repairPartProps.quantity,
              warehouseItemId: repairPartProps.warehouseItemId,
            };
          })
        : null,
      stages: props.stages
        .map((stage) => new OrderStageOrmMapper().toOrmEntity(stage))
        .map((stage) => ({ ...stage, orderId: props.id.value })),
      works: props.works?.length
        ? props.works.map((work) => new WorkOrmMapper().toOrmEntity(work))
        : null,
      checkCode: props.checkCode.value,
    };
  }
}
