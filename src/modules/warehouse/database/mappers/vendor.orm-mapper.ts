import {
  CreateEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/base-classes';
import { VendorEntity, VendorEntityProps } from '@modules/warehouse/domain';
import { VendorOrmEntity, VendorOrmEntityProps } from '../entities';

export class VendorOrmMapper extends OrmMapper<
  VendorEntity,
  VendorEntityProps,
  VendorOrmEntity
> {
  protected getEntityConstructor(ormEntity: VendorOrmEntity): {
    new (props: CreateEntityProps<VendorEntityProps>): VendorEntity;
  } {
    return VendorEntity;
  }

  protected getOrmEntityConstructor(entity: VendorEntity): {
    new (props: VendorOrmEntityProps): VendorOrmEntity;
  } {
    return VendorOrmEntity;
  }

  protected toDomainProps(ormEntity: VendorOrmEntity): VendorEntityProps {
    return {
      title: ormEntity.title,
      description: ormEntity.description,
    };
  }

  protected toOrmProps(entity: VendorEntity): OrmEntityProps<VendorOrmEntity> {
    const props = entity.getCopiedProps();
    return {
      title: props.title,
      description: props.description ?? null,
    };
  }
}
