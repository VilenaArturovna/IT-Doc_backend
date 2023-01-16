---
to: src/modules/<%= module %>/database/entities/<%= entity %>/<%= entity %>.objection.orm-entity.ts
---
<%Entity = h.changeCase.pascal(entity)
ObjectionOrmEntity = Entity + 'ObjectionOrmEntity'
OrmEntityProps = Entity + 'OrmEntityProps'
Model = Entity + 'Model' %>
import { <%= Model %>, <%= OrmEntityProps %>} from './<%= entity %>.orm-entity';

export class <%= ObjectionOrmEntity %> extends <%= Model %> {
  static tableName = '';

  static create(props: <%= OrmEntityProps %>) {
    return this.fromJson(props);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'createdAt', 'updatedAt'],
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      }
    }
  }
}
