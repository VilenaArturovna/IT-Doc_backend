import { Knex } from 'knex';

const tableName = 'staff';

export async function up(knex: Knex) {
  return knex.schema
    .alterTable(tableName, (t) => {
      t.string('middleName');
    })
    .then(() => knex(tableName).select('id'))
    .then((rows) => {
      if (rows.length) {
        return rows.forEach(
          async (row) =>
            await knex(tableName)
              .update({
                middleName: 'Отчество',
              })
              .where({ id: row.id }),
        );
      }
    })
    .then(() =>
      knex.schema.alterTable(tableName, (t) => {
        t.dropNullable('middleName');
      }),
    );
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dropColumn('middleName');
  });
}
