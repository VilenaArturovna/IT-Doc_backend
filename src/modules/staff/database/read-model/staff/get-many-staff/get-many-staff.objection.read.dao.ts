import { ExceptionBase } from '@libs/base-classes';
import { paginate } from '@libs/pagination';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { GetManyStaffQuery } from '@modules/staff/queries';
import { Model } from 'objection';

import {
  GetManyStaffDaoModel,
  GetManyStaffReadDao,
} from './get-many-staff.read.dao';

export class GetManyStaffObjectionReadDao extends GetManyStaffReadDao {
  async query(
    query: GetManyStaffQuery,
  ): Promise<Result<GetManyStaffDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const { page, limit, search, isActive } = query.params;

    const qb = knex(Tables.STAFF)
      .select(
        'id',
        'phone',
        'firstname',
        'lastname',
        'middleName',
        'avatar',
        'birthdate',
        'role',
        'isRemoved',
      )
      .orderBy('lastname', 'asc')
      .groupBy('id', 'lastname');

    if (search) {
      qb.where((builder) =>
        builder
          .whereILike('firstname', `%${search}%`)
          .orWhereILike('lastname', `%${search}%`)
          .orWhereILike('middleName', `%${search}%`),
      );
    }
    if (isActive) {
      qb.where({ isRemoved: false });
    }

    return paginate({ qb, page, limit, isGrouped: true });
  }
}
