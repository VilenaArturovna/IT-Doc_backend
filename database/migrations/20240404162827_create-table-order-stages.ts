import { Knex } from 'knex';

const orderStages = 'order_stages';
const orders = 'orders';

export async function up(knex: Knex) {
  return knex.schema.createTable(orderStages, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.uuid('orderId')
      .notNullable()
      .references('id')
      .inTable(orders)
      .onDelete('cascade');
    t.integer('number').notNullable();
    t.string('status').notNullable();
    t.timestamp('deadline');
    t.timestamp('completedAt');
    t.text('comment');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(orderStages);
}
