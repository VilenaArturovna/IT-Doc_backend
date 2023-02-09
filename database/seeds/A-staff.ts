import * as bcrypt from 'bcrypt';

import { Knex } from 'knex';
import {
  StaffObjectionOrmEntity,
  StaffOrmEntityProps,
} from '@modules/staff/database/entities';
import { Role } from '@modules/staff/types';

export async function seed(knex: Knex): Promise<any> {
  const superAdmin: StaffOrmEntityProps = {
    email: 'admin@itdoc.ru',
    firstname: 'super',
    lastname: 'admin',
    isRemoved: false,
    phone: '+79620496314',
    role: Role.ADMIN,
    password: bcrypt.hashSync('qweQWE123$', 10),
  };

  const { count } = await knex(StaffObjectionOrmEntity.tableName)
    .count()
    .first();

  if (Number(count)) return;

  await knex(StaffObjectionOrmEntity.tableName).insert(superAdmin);
}
