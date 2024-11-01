import { faker } from '@faker-js/faker';
import {
  WarehouseItemObjectionOrmEntity,
  WarehouseItemOrmEntityProps,
} from '@modules/warehouse/database/entities';
import { Section, Unit } from '@modules/warehouse/types';
import { EnvironmentTypes } from '@src/common/config/config.interface';
import { Knex } from 'knex';
import { v4 as uuid } from 'uuid';

faker.setLocale('ru');

export const vendorsIds: string[] = new Array(3).fill('').map(() => uuid());
export const providersIds: string[] = new Array(3).fill('').map(() => uuid());

export async function seed(knex: Knex) {
  const items: WarehouseItemOrmEntityProps[] = new Array(3)
    .fill('')
    .map((item, index) => {
      return {
        title: faker.commerce.product(),
        balance: faker.datatype.number({ min: 0, max: 100 }),
        criticalMargin: faker.datatype.number({ min: 10, max: 100 }),
        isArchived: false,
        unit: Unit.PIECE,
        price: faker.finance.amount(100, 5000, 0.01),
        section: Section.PRODUCT,
        providerId: providersIds[index],
        vendorId: vendorsIds[index],
      };
    });

  const env: EnvironmentTypes = process.env.NODE_ENV as EnvironmentTypes;
  if (env !== 'production') {
    const { count } = await knex(WarehouseItemObjectionOrmEntity.tableName)
      .count()
      .first();

    if (Number(count)) return;

    await knex(WarehouseItemObjectionOrmEntity.tableName).insert(items);
  }
}
