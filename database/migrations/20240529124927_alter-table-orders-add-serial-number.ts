import { Knex } from 'knex';

const tableName = 'orders';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.string('serialNumberEquipment');
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dropColumn('serialNumberEquipment');
  });
}
