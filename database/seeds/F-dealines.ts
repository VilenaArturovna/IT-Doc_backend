import { Knex } from 'knex';
import {
  DeadlineObjectionOrmEntity,
  DeadlineOrmEntityProps,
} from '@modules/order/database/entities';
import { faker } from '@faker-js/faker';
import { OrderStatus } from '@modules/order/types';

export async function seed(knex: Knex): Promise<void> {
  const statuses = [
    'REGISTERED',
    'IN_DIAGNOSTICS_QUEUE',
    'DIAGNOSTIC',
    'DIAGNOSED',
    'APPROVED',
    'APPROVED_AND_SPARE_PART_IS_ORDERED',
    'IN_PROGRESS',
  ];
  const items: DeadlineOrmEntityProps[] = statuses.map((status) => ({
    name: status as OrderStatus,
    normal: faker.datatype.number({ min: 15, max: 24 * 60 }),
    urgent: faker.datatype.number({ min: 15, max: 24 * 60 }),
  }));

  const { count } = await knex(DeadlineObjectionOrmEntity.tableName)
    .count()
    .first();

  if (Number(count)) return;

  await knex(DeadlineObjectionOrmEntity.tableName).insert(items);
}
