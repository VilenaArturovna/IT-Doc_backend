import { Knex } from 'knex';

const tableName = 'deadlines';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.enum('name', [
      'REGISTERED',
      'IN_DIAGNOSTICS_QUEUE',
      'DIAGNOSTIC',
      'DIAGNOSED',
      'APPROVED',
      'APPROVED_AND_SPARE_PART_IS_ORDERED',
      'IN_PROGRESS',
    ]).notNullable();
    t.string('normal').notNullable();
    t.string('urgent').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
