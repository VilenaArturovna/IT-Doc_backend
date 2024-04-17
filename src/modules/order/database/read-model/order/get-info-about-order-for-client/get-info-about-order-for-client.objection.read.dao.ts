import { ExceptionBase } from '@libs/base-classes';
import { NotFoundException } from '@libs/exceptions';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { GetInfoAboutOrderForClientQuery } from '@modules/order/queries';
import { Model } from 'objection';

import {
  GetInfoAboutOrderForClientDaoModel,
  GetInfoAboutOrderForClientReadDao,
} from './get-info-about-order-for-client.read.dao';

export class GetInfoAboutOrderForClientObjectionReadDao extends GetInfoAboutOrderForClientReadDao {
  async query(
    query: GetInfoAboutOrderForClientQuery,
  ): Promise<Result<GetInfoAboutOrderForClientDaoModel, ExceptionBase>> {
    const knex = Model.knex();
    const { number, checkCode } = query.params;

    const order = await knex(Tables.ORDERS)
      .select('number', 'status')
      .where({
        number,
        checkCode,
      })
      .first();

    if (!order) {
      return Result.fail(new NotFoundException('Указаны неверные данные'));
    }

    return Result.ok(order);
  }
}
