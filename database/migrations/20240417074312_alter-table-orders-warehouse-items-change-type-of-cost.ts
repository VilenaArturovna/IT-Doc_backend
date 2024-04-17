import { Knex } from 'knex';

const tableName = 'orders_warehouse_items';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.string('cost').notNullable().alter();
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.float('cost').notNullable().alter();
  });
}
