import { Knex } from 'knex';

const tableName = 'clients';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
    t.string('name').notNullable();
    t.string('phone').notNullable();
    t.enum('beneficiary', ['OOO', 'IP']).notNullable();
    t.enum('type', ['PHYSICAL_PERSON', 'LEGAL_PERSON']).notNullable();
    t.text('fullName').nullable();
    t.text('legalAddress').nullable();
    t.text('actualAddress').nullable();
    t.string('INN').nullable();
    t.string('KPP').nullable();
    t.string('OGRN').nullable();
    t.string('BIK').nullable();
    t.text('paymentAccount').nullable();
    t.text('correspondentAccount').nullable();
    t.string('directorName').nullable();
    t.string('email').nullable();
    t.string('contactPerson').nullable();
    t.string('contactPersonPhone').nullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
