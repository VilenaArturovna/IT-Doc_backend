import { ExceptionBase } from '@libs/base-classes';
import { paginate } from '@libs/pagination';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { GetManyOrdersQuery } from '@modules/order/queries';
import { OrderStatus } from '@modules/order/types';
import { Model } from 'objection';

import {
  GetManyOrdersDaoModel,
  GetManyOrdersReadDao,
} from './get-many-orders.read.dao';

export class GetManyOrdersObjectionReadDao extends GetManyOrdersReadDao {
  async query(
    query: GetManyOrdersQuery,
  ): Promise<Result<GetManyOrdersDaoModel, ExceptionBase>> {
    const knex = Model.knex();
    const { isActive, page, limit, staffId, isAdmin } = query.params;

    const stagesQb = knex(Tables.ORDER_STAGES)
      .select(
        'orderId',
        knex.raw(`
      array_agg(jsonb_build_object(
        'id', id,
        'createdAt', "createdAt",
        'status', status,
        'completedAt', "completedAt",
        'deadline', deadline,
        'comment', comment,
        'number', number
      )) as stages
    `),
      )
      .groupBy('orderId');

    const qb = knex(`${Tables.ORDERS} as o`)
      .select(
        'o.*',
        's.stages',
        knex.raw(`
          jsonb_build_object(
            'id', staff.id,
            'firstname', staff.firstname,
            'lastname', staff.lastname
          ) as "responsibleStaff",
          jsonb_build_object(
            'id', cl.id,
            'name', cl.name
          ) as "client"
        `),
      )
      .leftJoin(`${Tables.STAFF} as staff`, 'staff.id', 'o.responsibleStaffId')
      .innerJoin(`${Tables.CLIENTS} as cl`, 'cl.id', 'o.clientId')
      .innerJoin(knex.raw(`(${stagesQb}) as s on s."orderId" = o.id`))
      .orderBy('o.createdAt', 'desc')
      .groupBy('o.createdAt', 'o.id', 's.stages', 'staff.id', 'cl.id');

    if (isActive) {
      qb.whereNot('o.status', OrderStatus.COMPLETED);
    }

    if (staffId && !isAdmin) {
      qb.where((builder) =>
        builder.where({ responsibleStaffId: staffId }),
      ).orWhereNull('responsibleStaffId');
    }

    return paginate({ qb, page, limit, isGrouped: true });
  }
}
