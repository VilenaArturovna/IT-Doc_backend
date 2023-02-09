import { Knex } from 'knex';

const tableName = 'staff';

export async function up(knex: Knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.string('firstname').notNullable();
    t.string('lastname').notNullable();
    t.string('email').notNullable();
    t.string('password').notNullable();
    t.string('phone').notNullable();
    t.timestamp('birthdate').nullable();
    t.enum('role', [
      'admin',
      'engineer',
      'manager',
      'dispatcher',
    ]).notNullable();
    t.text('avatar').nullable();
    t.string('resetPasswordHash').nullable();
    t.boolean('isRemoved').defaultTo(false).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
