import { Knex } from 'knex';
import {
  ProviderObjectionOrmEntity,
  ProviderOrmEntityProps,
} from '@modules/warehouse/database/entities';
import { faker } from '@faker-js/faker';
import { providersIds } from './D-warehouse-items';

export async function seed(knex: Knex) {
  const items: ProviderOrmEntityProps[] = providersIds.map((id) => {
    return {
      title: faker.lorem.words(1),
      description: faker.lorem.sentence(5),
      id,
    };
  });

  const { count } = await knex(ProviderObjectionOrmEntity.tableName)
    .count()
    .first();

  if (Number(count)) return;

  await knex(ProviderObjectionOrmEntity.tableName).insert(items);
}
