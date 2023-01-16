---
to: src/modules/<%= module %>/queries/<%= entity %>/<%= name %>/<%= name %>.query-handler.ts
---
<%HandlerName = h.changeCase.pascal(name) + 'QueryHandler'
  QueryName = h.changeCase.pascal(name) + 'Query'
  ReadDao = h.changeCase.pascal(name) + 'ReadDao'
  DaoModel = h.changeCase.pascal(name) + 'DaoModel'%>
import { QueryHandler } from '@nestjs/cqrs';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import {
  <%= DaoModel %>,
  <%= ReadDao %>,
} from '@modules/<%= module %>/database/read-model';
import { <%= QueryName %> } from './<%= name %>.query';

@QueryHandler(<%= QueryName %>)
export class <%= HandlerName %> {
  constructor(private readonly readDao: <%= ReadDao %>) {}

  async execute(query: <%= QueryName %>): Promise<Result<<%= DaoModel %>, ExceptionBase>> {
    return this.readDao.query(query);
  }
}
