import { Knex } from 'knex';
import {
  VendorObjectionOrmEntity,
  VendorOrmEntityProps,
} from '@modules/warehouse/database/entities';
import { faker } from '@faker-js/faker';
import { vendorsIds } from './D-warehouse-items';

export async function seed(knex: Knex) {
  const items: VendorOrmEntityProps[] = vendorsIds.map((id) => {
    return {
      title: faker.lorem.words(1),
      description: faker.lorem.sentence(5),
      id,
    };
  });

  const { count } = await knex(VendorObjectionOrmEntity.tableName)
    .count()
    .first();

  if (Number(count)) return;

  await knex(VendorObjectionOrmEntity.tableName).insert(items);
}
