import { Knex } from 'knex';

const orders = 'orders';
const works = 'works';

export async function up(knex: Knex) {
  return knex.schema.alterTable(orders, (t) => {
    t.dropColumn('workId');
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(orders, (t) => {
    t.uuid('workId').references('id').inTable(works).nullable();
  });
}
