---
to: src/modules/<%= module %>/database/read-model/<%= entity %>/<%= name %>/<%= name %>.read.dao.ts
---
<%ReadDao = h.changeCase.pascal(name) + 'ReadDao'
  QueryName = h.changeCase.pascal(name) + 'Query'
  DaoModel = h.changeCase.pascal(name) + 'DaoModel'%>
import { ReadDaoBase, ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { ApiProperty } from '@nestjs/swagger';

import { <%= QueryName %> } from '@modules/<%= module %>/queries';

export class <%= DaoModel %> {

}

export abstract class <%= ReadDao %> extends ReadDaoBase<
  <%= DaoModel %>,
  <%= QueryName %>
> {
  abstract query(
    query: <%= QueryName %>,
  ): Promise<Result<<%= DaoModel %>, ExceptionBase>>;
}
