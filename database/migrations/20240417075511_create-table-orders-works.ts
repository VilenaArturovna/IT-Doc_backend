import { Knex } from 'knex';

const ordersWorks = 'orders_works';
const orders = 'orders';
const works = 'works';

export async function up(knex: Knex) {
  return knex.schema.createTable(ordersWorks, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.uuid('orderId')
      .references('id')
      .inTable(orders)
      .notNullable()
      .onDelete('cascade');
    t.uuid('workId').references('id').inTable(works).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ordersWorks);
}
