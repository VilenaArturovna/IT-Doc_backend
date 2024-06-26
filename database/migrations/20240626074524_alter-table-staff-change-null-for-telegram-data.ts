import { Knex } from 'knex';

const tableName = 'staff';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dropNullable('tgId');
    t.setNullable('tgUsername');
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dropNullable('tgUsername');
    t.setNullable('tgId');
  });
}
