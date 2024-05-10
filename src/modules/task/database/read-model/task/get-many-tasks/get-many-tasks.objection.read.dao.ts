import { ExceptionBase } from '@libs/base-classes';
import { paginate } from '@libs/pagination';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { GetManyTasksQuery } from '@modules/task/queries';
import { Model } from 'objection';

import {
  GetManyTasksDaoModel,
  GetManyTasksReadDao,
} from './get-many-tasks.read.dao';

export class GetManyTasksObjectionReadDao extends GetManyTasksReadDao {
  async query(
    query: GetManyTasksQuery,
  ): Promise<Result<GetManyTasksDaoModel, ExceptionBase>> {
    const knex = Model.knex();
    const { staffId, page, limit } = query.params;

    const qb = knex(`${Tables.TASKS} as t`)
      .select('t.id', 't.theme', 't.deadline', 'ts.isRead')
      .leftJoin(`${Tables.TASKS_STAFF} as ts`, 'ts.taskId', 't.id')
      .where('ts.staffId', staffId)
      .orderBy('t.createdAt', 'DESC')
      .groupBy('t.id', 't.createdAt', 'ts.isRead');

    return paginate({ page, limit, qb, isGrouped: true });
  }
}
