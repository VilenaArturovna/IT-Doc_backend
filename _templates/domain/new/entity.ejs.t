---
to: src/modules/<%= module %>/domain/entities/<%= entity %>.entity.ts
---
<%Entity = h.changeCase.pascal(entity)
EntityProps = Entity + 'EntityProps'
DomainEntity= Entity + 'Entity'

Model = Entity + 'Model' %>
import { EntityBase } from '@libs/base-classes';
import { IdVO } from '@libs/value-objects';

export interface <%= EntityProps %> {
}

export class <%= DomainEntity%> extends EntityBase<<%= EntityProps %>> {
  protected readonly _id: IdVO;

  protected static create(props: <%= EntityProps %>): <%= DomainEntity%> {
    return new <%= DomainEntity%>({ props });
  }

  protected validate() {}
}
