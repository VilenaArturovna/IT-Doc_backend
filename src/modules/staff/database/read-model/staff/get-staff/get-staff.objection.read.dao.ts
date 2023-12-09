import { ExceptionBase } from '@libs/base-classes';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { GetStaffQuery } from '@modules/staff/queries';
import { Model } from 'objection';

import { GetStaffDaoModel, GetStaffReadDao } from './get-staff.read.dao';

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
