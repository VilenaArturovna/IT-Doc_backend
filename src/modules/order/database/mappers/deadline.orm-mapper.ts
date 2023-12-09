import {
  CreateEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/base-classes';
import { DeadlineEntity, DeadlineEntityProps } from '@modules/order/domain';

import { DeadlineOrmEntity, DeadlineOrmEntityProps } from '../entities';

export class DeadlineOrmMapper extends OrmMapper<
  DeadlineEntity,
  DeadlineEntityProps,
  DeadlineOrmEntity
> {
  protected getEntityConstructor(ormEntity: DeadlineOrmEntity): {
    new (props: CreateEntityProps<DeadlineEntityProps>): DeadlineEntity;
  } {
    return DeadlineEntity;
  }

  protected getOrmEntityConstructor(entity: DeadlineEntity): {
    new (props: DeadlineOrmEntityProps): DeadlineOrmEntity;
  } {
    return DeadlineOrmEntity;
  }

  protected toDomainProps(ormEntity: DeadlineOrmEntity): DeadlineEntityProps {
    return {
      urgent: ormEntity.urgent,
      normal: ormEntity.normal,
      name: ormEntity.name,
    };
  }

  protected toOrmProps(
    entity: DeadlineEntity,
  ): OrmEntityProps<DeadlineOrmEntity> {
    const props = entity.getCopiedProps();
    return {
      urgent: props.urgent,
      normal: props.normal,
      name: props.name,
    };
  }
}
