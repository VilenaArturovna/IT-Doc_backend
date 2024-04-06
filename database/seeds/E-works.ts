import { faker } from '@faker-js/faker';
import {
  WorkObjectionOrmEntity,
  WorkOrmEntityProps,
} from '@modules/order/database/entities';
import { Knex } from 'knex';
import { v4 as uuid } from 'uuid';

faker.setLocale('ru');

export const worksIds: string[] = new Array(3).fill('').map(() => uuid());

export async function seed(knex: Knex) {
  const items: WorkOrmEntityProps[] = worksIds.map((id) => {
    return {
      name: faker.lorem.words(5),
      price: faker.finance.amount(1000, 15000, 0.01),
      time: faker.datatype.number({ min: 120, max: 600 }),
      id,
    };
  });

  const { count } = await knex(WorkObjectionOrmEntity.tableName)
    .count()
    .first();

  if (Number(count)) return;

  await knex(WorkObjectionOrmEntity.tableName).insert(items);
}
