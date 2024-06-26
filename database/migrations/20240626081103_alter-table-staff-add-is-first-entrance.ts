import { Knex } from 'knex';

const tableName = 'staff';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.boolean('isFirstEntrance').notNullable().defaultTo(true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dropColumn('isFirstEntrance');
  });
}
