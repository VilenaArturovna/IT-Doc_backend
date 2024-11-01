import { Knex } from 'knex';

const orders = 'orders';
const ordersWarehouseItems = 'orders_warehouse_items';
const clients = 'clients';
const works = 'works';
const staff = 'staff';
const warehouseItems = 'warehouse_items';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(orders, (t) => {
      t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      t.timestamp('createdAt').defaultTo(knex.fn.now());
      t.timestamp('updatedAt').defaultTo(knex.fn.now());
      t.string('status').notNullable();
      t.timestamp('deadline').notNullable();
      t.string('equipment').notNullable();
      t.string('equipmentCondition').notNullable();
      t.string('malfunction').notNullable();
      t.string('priority').notNullable();
      t.enum('beneficiary', ['OOO', 'IP']).notNullable();
      t.uuid('clientId')
        .references('id')
        .inTable(clients)
        .onDelete('set null')
        .notNullable();
      t.uuid('workId').references('id').inTable(works).nullable();
      t.uuid('responsibleStaffId')
        .references('id')
        .inTable(staff)
        .onDelete('set null')
        .nullable();
    })
    .createTable(ordersWarehouseItems, (t) => {
      t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      t.uuid('orderId')
        .references('id')
        .inTable(orders)
        .onDelete('cascade')
        .notNullable();
      t.uuid('warehouseItemId')
        .references('id')
        .inTable(warehouseItems)
        .onDelete('set null')
        .notNullable();
      t.integer('quantity').notNullable();
      t.float('cost').notNullable();
    })
    .raw('CREATE SEQUENCE "order-number" INCREMENT 1 START 00001')
    .then(() => {
      return knex.raw(
        `ALTER TABLE "orders" ADD COLUMN "number" text DEFAULT lpad(nextval('order-number')::text,5,'0');`,
      );
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ordersWarehouseItems).dropTable(orders);
}
