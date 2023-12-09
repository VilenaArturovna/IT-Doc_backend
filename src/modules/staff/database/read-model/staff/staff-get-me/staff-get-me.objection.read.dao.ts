import { ExceptionBase } from '@libs/base-classes';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { StaffGetMeQuery } from '@modules/staff/queries';
import { Model } from 'objection';

import { StaffGetMeDaoModel, StaffGetMeReadDao } from './staff-get-me.read.dao';

export class StaffGetMeObjectionReadDao extends StaffGetMeReadDao {
  async query(
    query: StaffGetMeQuery,
  ): Promise<Result<StaffGetMeDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const staff = await knex(Tables.STAFF)
      .select(
        'id',
        'email',
        'phone',
        'firstname',
        'lastname',
        'avatar',
        'birthdate',
        'role',
      )
      .where('id', query.params.id)
      .first();

    return Result.ok(staff);
  }
}
