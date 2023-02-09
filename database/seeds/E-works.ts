import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';
import {
  WorkObjectionOrmEntity,
  WorkOrmEntityProps,
} from '@modules/order/database/entities';

export const worksIds: string[] = new Array(3).fill('').map(() => uuid());

export async function seed(knex: Knex) {
  const items: WorkOrmEntityProps[] = worksIds.map((id) => {
    return {
      name: faker.lorem.words(5),
      price: faker.datatype.number({ min: 1000, max: 15000, precision: 0.01 }),
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
