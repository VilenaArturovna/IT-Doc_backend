import {
  CreateEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/base-classes';
import { ProviderEntity, ProviderEntityProps } from '@modules/warehouse/domain';

import { ProviderOrmEntity, ProviderOrmEntityProps } from '../entities';

export class ProviderOrmMapper extends OrmMapper<
  ProviderEntity,
  ProviderEntityProps,
  ProviderOrmEntity
> {
  protected getEntityConstructor(ormEntity: ProviderOrmEntity): {
    new (props: CreateEntityProps<ProviderEntityProps>): ProviderEntity;
  } {
    return ProviderEntity;
  }

  protected getOrmEntityConstructor(entity: ProviderEntity): {
    new (props: ProviderOrmEntityProps): ProviderOrmEntity;
  } {
    return ProviderOrmEntity;
  }

  protected toDomainProps(ormEntity: ProviderOrmEntity): ProviderEntityProps {
    return {
      title: ormEntity.title,
      description: ormEntity.description,
    };
  }

  protected toOrmProps(
    entity: ProviderEntity,
  ): OrmEntityProps<ProviderOrmEntity> {
    const props = entity.getCopiedProps();
    return {
      title: props.title,
      description: props.description ?? null,
    };
  }
}
