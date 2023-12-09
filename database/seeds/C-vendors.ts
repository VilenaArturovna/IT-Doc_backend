import { faker } from '@faker-js/faker';
import {
  VendorObjectionOrmEntity,
  VendorOrmEntityProps,
} from '@modules/warehouse/database/entities';
import { Knex } from 'knex';

import { vendorsIds } from './D-warehouse-items';

faker.setLocale('ru');

export async function seed(knex: Knex) {
  const items: VendorOrmEntityProps[] = vendorsIds.map((id) => {
    return {
      title: faker.company.name(),
      description: faker.lorem.paragraph(5),
      id,
    };
  });

  const { count } = await knex(VendorObjectionOrmEntity.tableName)
    .count()
    .first();

  if (Number(count)) return;

  await knex(VendorObjectionOrmEntity.tableName).insert(items);
}
