import { ExceptionBase } from '@libs/base-classes';
import { NotFoundException } from '@libs/exceptions';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { GetOneWorkQuery } from '@modules/order/queries';
import { Model } from 'objection';

import { GetOneWorkDaoModel, GetOneWorkReadDao } from './get-one-work.read.dao';

export class GetOneWorkObjectionReadDao extends GetOneWorkReadDao {
  async query(
    query: GetOneWorkQuery,
  ): Promise<Result<GetOneWorkDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const work = await knex(Tables.WORKS)
      .select('*')
      .where('id', query.params.id)
      .first();

    if (!work) {
      return Result.fail(new NotFoundException('Work not found'));
    }

    return Result.ok(work);
  }
}
