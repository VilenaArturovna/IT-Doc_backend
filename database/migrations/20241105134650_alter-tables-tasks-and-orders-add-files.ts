import { Knex } from 'knex';

const orders = 'orders';
const tasks = 'tasks';

export async function up(knex: Knex) {
  return knex.schema
    .alterTable(tasks, (t) => {
      t.jsonb('files').nullable();
    })
    .alterTable(orders, (t) => {
      t.jsonb('files').nullable();
    });
}

export async function down(knex: Knex) {
  return knex.schema
    .alterTable(tasks, (t) => {
      t.dropColumn('files');
    })
    .alterTable(orders, (t) => {
      t.dropColumn('files');
    });
}
