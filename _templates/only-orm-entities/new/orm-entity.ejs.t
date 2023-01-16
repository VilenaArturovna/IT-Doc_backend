---
to: src/modules/<%= module %>/database/entities/<%= entity %>/<%= entity %>.orm-entity.ts
---
<%Entity = h.changeCase.pascal(entity)
OrmEntityProps = Entity + 'OrmEntityProps'
OrmEntity = Entity + 'OrmEntity'
Model = Entity + 'Model' %>
import { ModelBase } from '@libs/base-classes';

export interface <%= OrmEntityProps %> {}

export class <%= OrmEntity %> implements <%= OrmEntityProps %> {}

export class <%= Model %> extends ModelBase implements <%= OrmEntity %> {}
