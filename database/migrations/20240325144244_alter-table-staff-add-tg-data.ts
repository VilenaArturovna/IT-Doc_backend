import { Knex } from 'knex';

const tableName = 'staff';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.string('tgId').unique();
    t.string('tgUsername').unique().notNullable();
    t.dropColumns('email', 'password', 'resetPasswordHash');
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dropColumns('tgId', 'tgUsername');
    t.string('email').notNullable();
    t.string('password').notNullable();
    t.string('resetPasswordHash').notNullable();
  });
}
