import { Knex } from 'knex';

const tasks = 'tasks';
const tasksStaff = 'tasks_staff';
const staff = 'staff';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(tasks, (t) => {
      t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      t.timestamp('createdAt').defaultTo(knex.fn.now());
      t.timestamp('updatedAt').defaultTo(knex.fn.now());
      t.string('theme').notNullable();
      t.text('description').notNullable();
      t.string('status').notNullable();
      t.string('price');
      t.timestamp('deadline');
    })
    .createTable(tasksStaff, (t) => {
      t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      t.timestamp('createdAt').defaultTo(knex.fn.now());
      t.timestamp('updatedAt').defaultTo(knex.fn.now());
      t.boolean('isResponsible').notNullable();
      t.boolean('isAuthor').notNullable();
      t.boolean('isRead').notNullable();
      t.text('comment');
      t.uuid('staffId').references('id').inTable(staff).notNullable();
      t.uuid('taskId')
        .references('id')
        .inTable(tasks)
        .notNullable()
        .onDelete('CASCADE');
    })
    .raw('CREATE SEQUENCE "task-number" INCREMENT 1 START 001')
    .then(() => {
      return knex.raw(
        `ALTER TABLE ${tasks} ADD COLUMN "number" text DEFAULT lpad(nextval('task-number')::text,3,'0');`,
      );
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tasksStaff).dropTable(tasks);
}
