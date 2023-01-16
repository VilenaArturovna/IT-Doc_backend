---
to: src/modules/<%= module %>/database/repositories/<%= entity %>.objection.repository.ts
---
<%Entity = h.changeCase.pascal(entity)
ObjectionOrmEntity = Entity + 'ObjectionOrmEntity'
DomainEntity= Entity + 'Entity'
EntityProps = Entity + 'EntityProps'
OrmEntity = Entity + 'OrmEntity'
OrmMapper = Entity + 'OrmMapper'
ObjectionRepository = Entity + 'ObjectionRepository' %>
import { ObjectionRepositoryBase } from '@libs/base-classes';
import { <%= DomainEntity%>, <%= EntityProps %> } from '@modules/<%= module %>/domain';
import { <%= ObjectionOrmEntity %>, <%= OrmEntity %> } from '../entities';
import { <%= OrmMapper %> } from '../mappers';

export class <%= ObjectionRepository %> extends ObjectionRepositoryBase<
  <%= DomainEntity%>,
  <%= EntityProps %>,
  <%= OrmEntity %>,
  <%= ObjectionOrmEntity %>,
  <%= OrmMapper%>
> {
  constructor() {
    super(<%= ObjectionOrmEntity %>, new <%= OrmMapper %>());
  }
}
