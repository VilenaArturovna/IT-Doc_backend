import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { Model } from 'objection';

import {
  GetOneProviderDaoModel,
  GetOneProviderReadDao,
} from './get-one-provider.read.dao';
import { GetOneProviderQuery } from '@modules/warehouse/queries';
import { NotFoundException } from '@libs/exceptions';

export class GetOneProviderObjectionReadDao extends GetOneProviderReadDao {
  async query(
    query: GetOneProviderQuery,
  ): Promise<Result<GetOneProviderDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const provider = await knex('providers')
      .select('id', 'title', 'description')
      .where('id', query.params.id)
      .first();

    if (!provider) {
      return Result.fail(new NotFoundException('Поставщик не найден'));
    }

    return Result.ok(provider);
  }
}
