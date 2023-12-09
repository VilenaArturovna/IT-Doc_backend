import { ExceptionBase } from '@libs/base-classes';
import { NotFoundException } from '@libs/exceptions';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { GetOneProviderQuery } from '@modules/warehouse/queries';
import { Model } from 'objection';

import {
  GetOneProviderDaoModel,
  GetOneProviderReadDao,
} from './get-one-provider.read.dao';

export class GetOneProviderObjectionReadDao extends GetOneProviderReadDao {
  async query(
    query: GetOneProviderQuery,
  ): Promise<Result<GetOneProviderDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const provider = await knex(Tables.PROVIDERS)
      .select('id', 'title', 'description')
      .where('id', query.params.id)
      .first();

    if (!provider) {
      return Result.fail(new NotFoundException('Поставщик не найден'));
    }

    return Result.ok(provider);
  }
}
