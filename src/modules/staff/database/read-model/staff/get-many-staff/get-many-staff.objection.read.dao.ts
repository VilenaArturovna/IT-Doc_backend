import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { Model } from 'objection';

import {
  GetManyStaffDaoModel,
  GetManyStaffReadDao,
} from './get-many-staff.read.dao';
import { GetManyStaffQuery } from '@modules/staff/queries';
import { paginate } from '@libs/pagination';

export class GetManyStaffObjectionReadDao extends GetManyStaffReadDao {
  async query(
    query: GetManyStaffQuery,
  ): Promise<Result<GetManyStaffDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const { page, limit, search } = query.params;

    const qb = knex('staff').select(
      'id',
      'email',
      'phone',
      'firstname',
      'lastname',
      'avatar',
      'birthdate',
      'role',
      'isRemoved',
    );

    if (search) {
      qb.where((builder) =>
        builder
          .whereILike('firstname', `%${search}%`)
          .orWhereILike('lastname', `%${search}%`),
      );
    }

    return paginate({ qb, page, limit, isGrouped: false });
  }
}
