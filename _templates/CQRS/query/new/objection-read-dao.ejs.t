---
to: src/modules/<%= module %>/database/read-model/<%= entity %>/<%= name %>/<%= name %>.objection.read.dao.ts
---
<%ReadDao = h.changeCase.pascal(name) + 'ReadDao'
  Query = h.changeCase.pascal(name) + 'Query'
  DaoModel = h.changeCase.pascal(name) + 'DaoModel'
  ObjectionReadDao = h.changeCase.pascal(name) + 'ObjectionReadDao'%>
import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { Model } from 'objection';

import { <%= DaoModel %>, <%= ReadDao %> } from './<%= name %>.read.dao';
import { <%= Query %> } from '@modules/<%= module %>/queries';

export class <%= ObjectionReadDao %> extends <%= ReadDao %> {
  async query(
    query: <%= Query %>,
  ): Promise<Result<<%= DaoModel %>, ExceptionBase>> {
    const knex = Model.knex()


    return Result.ok({

    });
  }
}
