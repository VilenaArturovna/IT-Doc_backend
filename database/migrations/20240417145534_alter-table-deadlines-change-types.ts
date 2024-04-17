import { Knex } from 'knex';

const tableName = 'deadlines';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.integer('normal').notNullable().alter();
    t.integer('urgent').notNullable().alter();
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.string('normal').notNullable().alter();
    t.string('urgent').notNullable().alter();
  });
}
