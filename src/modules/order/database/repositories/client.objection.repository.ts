import { ObjectionRepositoryBase } from '@libs/base-classes';
import { ClientEntity, ClientEntityProps } from '@modules/order/domain';
import { ClientObjectionOrmEntity, ClientOrmEntity } from '../entities';
import { ClientOrmMapper } from '../mappers';

export class ClientObjectionRepository extends ObjectionRepositoryBase<
  ClientEntity,
  ClientEntityProps,
  ClientOrmEntity,
  ClientObjectionOrmEntity,
  ClientOrmMapper
> {
  constructor() {
    super(ClientObjectionOrmEntity, new ClientOrmMapper());
  }
}
