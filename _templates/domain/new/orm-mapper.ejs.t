---
to: src/modules/<%= module %>/database/mappers/<%= entity %>.orm-mapper.ts
---
<%Entity = h.changeCase.pascal(entity)
DomainEntity= Entity + 'Entity'
EntityProps = Entity + 'EntityProps'
OrmEntity = Entity + 'OrmEntity'
OrmMapper = Entity + 'OrmMapper'
OrmEntityProps = Entity + 'OrmEntityProps' %>
import {
  CreateEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/base-classes';
import { <%= DomainEntity%>, <%= EntityProps %> } from '@modules/<%= module %>/domain';
import { <%= OrmEntity %>, <%= OrmEntityProps %> } from '../entities';

export class <%= OrmMapper %> extends OrmMapper<
  <%= DomainEntity%>,
  <%= EntityProps %>,
  <%= OrmEntity %>
> {
  protected getEntityConstructor(ormEntity: <%= OrmEntity %>): {
    new (props: CreateEntityProps<<%= EntityProps %>>): <%= DomainEntity%>;
  } {
    return <%= DomainEntity%>;
  }

  protected getOrmEntityConstructor(entity: <%= DomainEntity%>): {
    new (props: <%= OrmEntityProps %>,): <%= OrmEntity %>;
  } {
    return <%= OrmEntity %>;
  }

  protected toDomainProps(ormEntity: <%= OrmEntity %>): <%= EntityProps %> {
    return {

    };
  }

  protected toOrmProps(entity: <%= DomainEntity%>): OrmEntityProps<<%= OrmEntity %>> {
    const props = entity.getCopiedProps();
    return {

    };
  }
}
