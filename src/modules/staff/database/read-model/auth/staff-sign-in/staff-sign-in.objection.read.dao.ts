import { ExceptionBase } from '@libs/base-classes';
import { ConflictException } from '@libs/exceptions';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { StaffSignInQuery } from '@modules/staff/queries';
import { Model } from 'objection';

import {
  StaffSignInDaoModel,
  StaffSignInReadDao,
} from './staff-sign-in.read.dao';

export class StaffSignInObjectionReadDao extends StaffSignInReadDao {
  async query(
    query: StaffSignInQuery,
  ): Promise<Result<StaffSignInDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const staff = await knex(Tables.STAFF)
      .select('id', 'role', 'password')
      .where('email', query.params.email)
      .first();

    if (!staff) {
      return Result.fail(new ConflictException('Неверный логин или пароль'));
    }

    return Result.ok(staff);
  }
}
