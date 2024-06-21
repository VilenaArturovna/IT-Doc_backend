import { Knex } from 'knex';

const tableName = 'staff';
const concat = `
  substring(firstname for 1) || '.' || 
  substring("middleName" for 1) || '. ' ||
  lastname`;
const column = 'abbreviatedName';

export async function up(knex: Knex) {
  return knex.schema.raw(
    `alter table ${tableName} add column "${column}" text generated always as (${concat}) stored;`,
  );
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dropColumn(column);
  });
}
