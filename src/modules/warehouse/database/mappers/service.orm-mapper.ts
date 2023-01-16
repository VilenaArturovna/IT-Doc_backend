import {
  CreateEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/base-classes';
import { ServiceEntity, ServiceEntityProps } from '@modules/warehouse/domain';
import { ServiceOrmEntity, ServiceOrmEntityProps } from '../entities';
import { Currency, MoneyVO } from '@libs/value-objects';

export class ServiceOrmMapper extends OrmMapper<
  ServiceEntity,
  ServiceEntityProps,
  ServiceOrmEntity
> {
  protected getEntityConstructor(ormEntity: ServiceOrmEntity): {
    new (props: CreateEntityProps<ServiceEntityProps>): ServiceEntity;
  } {
    return ServiceEntity;
  }

  protected getOrmEntityConstructor(entity: ServiceEntity): {
    new (props: ServiceOrmEntityProps): ServiceOrmEntity;
  } {
    return ServiceOrmEntity;
  }

  protected toDomainProps(ormEntity: ServiceOrmEntity): ServiceEntityProps {
    return {
      title: ormEntity.title,
      description: ormEntity.description,
      cost: MoneyVO.toVO({ amount: ormEntity.cost, currency: Currency.RUR }),
    };
  }

  protected toOrmProps(
    entity: ServiceEntity,
  ): OrmEntityProps<ServiceOrmEntity> {
    const props = entity.getCopiedProps();
    return {
      title: props.title,
      description: props.description ?? null,
      cost: props.cost.amount,
    };
  }
}
