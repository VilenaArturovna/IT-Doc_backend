import { Knex } from 'knex';

const warehouseItems = 'warehouse_items';
const works = 'works';
const orders = 'orders';

export async function up(knex: Knex) {
  return knex.schema
    .alterTable(warehouseItems, (t) => {
      t.string('price').notNullable().alter();
    })
    .alterTable(orders, (t) => {
      t.string('price').notNullable();
    })
    .alterTable(works, (t) => {
      t.string('price').notNullable().alter();
    });
}

export async function down(knex: Knex) {
  return knex.schema
    .alterTable(warehouseItems, (t) => {
      t.float('price').notNullable().alter();
    })
    .alterTable(orders, (t) => {
      t.float('price').notNullable().alter();
    })
    .alterTable(works, (t) => {
      t.float('price').notNullable().alter();
    });
}
