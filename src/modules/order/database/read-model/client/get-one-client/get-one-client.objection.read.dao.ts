import { ExceptionBase } from '@libs/base-classes';
import { NotFoundException } from '@libs/exceptions';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { GetOneClientQuery } from '@modules/order/queries';
import { Model } from 'objection';

import {
  GetOneClientDaoModel,
  GetOneClientReadDao,
} from './get-one-client.read.dao';

export class GetOneClientObjectionReadDao extends GetOneClientReadDao {
  async query(
    query: GetOneClientQuery,
  ): Promise<Result<GetOneClientDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const client = await knex(Tables.CLIENTS)
      .where('id', query.params.id)
      .first();

    if (!client) {
      return Result.fail(new NotFoundException('Клиент не найден'));
    }

    return Result.ok(client);
  }
}
