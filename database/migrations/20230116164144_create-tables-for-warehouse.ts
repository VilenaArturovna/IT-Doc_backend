import { Knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema
    .createTable('vendors', (t) => {
      t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      t.timestamp('createdAt').defaultTo(knex.fn.now());
      t.timestamp('updatedAt').defaultTo(knex.fn.now());
      t.string('name').notNullable();
      t.text('description').nullable();
    })
    .createTableLike('providers', 'vendors')
    .createTableLike('services', 'vendors', (t) => {
      t.float('cost').notNullable();
    })
    .createTable('warehouse_items', (t) => {
      t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      t.timestamp('createdAt').defaultTo(knex.fn.now());
      t.timestamp('updatedAt').defaultTo(knex.fn.now());
      t.enum('section', ['MATERIAL', 'SERVICE', 'PRODUCT']).notNullable();
      t.enum('unit', ['KG', 'PIECE', 'SET']).notNullable();
      t.string('partNumber').nullable();
      t.string('packing').nullable();
      t.timestamp('nextDeliveryDate').nullable();
      t.text('compatibleModels').nullable();
      t.string('title').notNullable();
      t.float('price').notNullable();
      t.float('balance').notNullable();
      t.float('criticalMargin').notNullable();
      t.float('expense').nullable();
      t.float('expenseReserve').nullable();
      t.boolean('isArchived').notNullable();
      t.uuid('vendorId').references('id').inTable('vendors').notNullable();
      t.uuid('providerId').references('id').inTable('providers').notNullable();
      t.uuid('serviceId').references('id').inTable('services').nullable();
    });
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTable('vendors')
    .dropTable('providers')
    .dropTable('services')
    .dropTable('warehouse_items');
}
