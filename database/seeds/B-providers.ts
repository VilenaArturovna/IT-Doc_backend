import { faker } from '@faker-js/faker';
import {
  ProviderObjectionOrmEntity,
  ProviderOrmEntityProps,
} from '@modules/warehouse/database/entities';
import { Knex } from 'knex';

import { providersIds } from './D-warehouse-items';

faker.setLocale('ru');

export async function seed(knex: Knex) {
  const items: ProviderOrmEntityProps[] = providersIds.map((id) => {
    return {
      title: faker.company.name(),
      description: faker.lorem.paragraph(5),
      id,
    };
  });

  const { count } = await knex(ProviderObjectionOrmEntity.tableName)
    .count()
    .first();

  if (Number(count)) return;

  await knex(ProviderObjectionOrmEntity.tableName).insert(items);
}
