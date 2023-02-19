import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { Model } from 'objection';

import {
  GetOneClientDaoModel,
  GetOneClientReadDao,
} from './get-one-client.read.dao';
import { GetOneClientQuery } from '@modules/order/queries';
import { NotFoundException } from '@libs/exceptions';

export class GetOneClientObjectionReadDao extends GetOneClientReadDao {
  async query(
    query: GetOneClientQuery,
  ): Promise<Result<GetOneClientDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const client = await knex('clients').where('id', query.params.id).first();

    if (!client) {
      return Result.fail(new NotFoundException('Клиент не найден'));
    }

    return Result.ok(client);
  }
}
