import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { Model } from 'objection';

import { GetStaffDaoModel, GetStaffReadDao } from './get-staff.read.dao';
import { GetStaffQuery } from '@modules/staff/queries';
import { Tables } from '@libs/tables';

export class GetStaffObjectionReadDao extends GetStaffReadDao {
  async query(
    query: GetStaffQuery,
  ): Promise<Result<GetStaffDaoModel, ExceptionBase>> {
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
        'isRemoved',
      )
      .where('id', query.params.id)
      .first();

    return Result.ok(staff);
  }
}
