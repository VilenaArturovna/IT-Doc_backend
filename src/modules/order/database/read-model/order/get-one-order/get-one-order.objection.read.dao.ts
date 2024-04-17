import { ExceptionBase } from '@libs/base-classes';
import { NotFoundException } from '@libs/exceptions';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { GetOneOrderQuery } from '@modules/order/queries';
import { Model } from 'objection';

import {
  GetOneOrderDaoModel,
  GetOneOrderReadDao,
} from './get-one-order.read.dao';

export class GetOneOrderObjectionReadDao extends GetOneOrderReadDao {
  async query(
    query: GetOneOrderQuery,
  ): Promise<Result<GetOneOrderDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const { id } = query.params;

    const worksQb = knex(`${Tables.ORDERS_WORKS} as ow`)
      .innerJoin(`${Tables.WORKS} as w`, 'w.id', 'ow.workId')
      .select(
        'ow.orderId',
        knex.raw(`
          array_agg(jsonb_build_object(
          'id', w.id,
          'name', w.name,
          'price', w.price
          )) as works
        `),
      )
      .groupBy('ow.orderId');

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
        'comment', comment
      )) as stages
    `),
      )
      .groupBy('orderId')
      .orderBy('createdAt')
      .first();

    const partsQb = knex(`${Tables.ORDERS_WAREHOUSE_ITEMS} as owi`)
      .select(
        'orderId',
        knex.raw(`
          array_agg(jsonb_build_object(
          'id', wi.id,
          'title', wi.title,
          'quantity', owi.quantity,
          'cost', owi.cost
          )) as "repairParts"
        `),
      )
      .innerJoin(
        `${Tables.WAREHOUSE_ITEMS} as wi`,
        'wi.id',
        'owi.warehouseItemId',
      )
      .groupBy('orderId')
      .first();

    const order = await knex(`${Tables.ORDERS} as o`)
      .select(
        'o.*',
        's.stages',
        'p.repairParts',
        'w.works',
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
      .leftJoin(knex.raw(`(${partsQb}) as p on p."orderId" = o.id`))
      .leftJoin(knex.raw(`(${worksQb}) as w on w."orderId" = o.id`))
      .where('o.id', id)
      .first();

    if (!order) return Result.fail(new NotFoundException('Заявка не найдена'));

    return Result.ok(order);
  }
}
