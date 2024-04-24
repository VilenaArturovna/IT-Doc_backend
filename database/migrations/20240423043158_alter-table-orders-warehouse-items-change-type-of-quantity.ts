import { Knex } from 'knex';

const tableName = 'orders_warehouse_items';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.float('quantity').notNullable().alter();
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.integer('quantity').notNullable().alter();
  });
}
