import { ExceptionBase } from '@libs/base-classes';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { GetAllDeadlinesQuery } from '@modules/order/queries';
import { Model } from 'objection';

import {
  GetAllDeadlinesDaoModel,
  GetAllDeadlinesReadDao,
} from './get-all-deadlines.read.dao';

export class GetAllDeadlinesObjectionReadDao extends GetAllDeadlinesReadDao {
  async query(
    query: GetAllDeadlinesQuery,
  ): Promise<Result<GetAllDeadlinesDaoModel[], ExceptionBase>> {
    const knex = Model.knex();

    const deadlines = await knex(Tables.DEADLINES)
      .select('id', 'name', 'normal', 'urgent')
      .orderBy('name');

    return Result.ok(deadlines);
  }
}
