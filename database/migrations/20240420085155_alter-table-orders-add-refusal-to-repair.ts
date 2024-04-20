import { Knex } from 'knex';

const tableName = 'orders';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.boolean('refusalToRepair');
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dropColumn('refusalToRepair');
  });
}
