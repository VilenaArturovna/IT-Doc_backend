import { ExceptionBase } from '@libs/base-classes';
import { Tables } from '@libs/tables';
import { Result } from '@libs/utils';
import { GetCertificateOfTechnicalConditionQuery } from '@modules/order/queries';
import { Model } from 'objection';

import {
  GetCertificateOfTechnicalConditionDaoModel,
  GetCertificateOfTechnicalConditionReadDao,
} from './get-certificate-of-technical-condition.read.dao';

export class GetCertificateOfTechnicalConditionObjectionReadDao extends GetCertificateOfTechnicalConditionReadDao {
  async query(
    query: GetCertificateOfTechnicalConditionQuery,
  ): Promise<
    Result<GetCertificateOfTechnicalConditionDaoModel, ExceptionBase>
  > {
    const knex = Model.knex();

    const qb = knex(`${Tables.ORDERS} as o`)
      .select(
        'o.number',
        'o.equipment',
        'o.equipmentCondition',
        'o.serialNumberEquipment',
        'c.name as client',
        's.abbreviatedName as staff',
        knex.raw(`
          array_agg(w.name) as works
        `),
      )
      .innerJoin(`${Tables.CLIENTS} as c`, 'c.id', 'o.clientId')
      .innerJoin(`${Tables.STAFF} as s`, 's.id', 'o.responsibleStaffId')
      .leftJoin(`${Tables.ORDERS_WORKS} as ow`, 'o.id', 'ow.orderId')
      .leftJoin(`${Tables.WORKS} as w`, 'w.id', 'ow.workId')
      .where('o.id', query.params.id)
      .groupBy(
        'o.number',
        'o.equipment',
        'o.equipmentCondition',
        'o.serialNumberEquipment',
        'c.name',
        's.abbreviatedName',
      )
      .first();

    return Result.ok(await qb);
  }
}
