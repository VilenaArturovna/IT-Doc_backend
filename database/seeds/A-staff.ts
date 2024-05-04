import {
  StaffObjectionOrmEntity,
  StaffOrmEntityProps,
} from '@modules/staff/database/entities';
import { Role } from '@modules/staff/types';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<any> {
  const superAdmin: StaffOrmEntityProps = {
    firstname: 'super',
    lastname: 'admin',
    middleName: 'admin',
    isRemoved: false,
    phone: '+79620496314',
    role: Role.ADMIN,
    tgUsername: 'vilena_arturovna',
    tgId: '762652372',
    avatar:
      'https://t.me/i/userpic/320/GMaHJnJm7l9rWFOHeFjreAWklcnfbaGPvrhJn1PLRAI.jpg',
  };

  const { count } = await knex(StaffObjectionOrmEntity.tableName)
    .count()
    .first();

  if (Number(count)) return;

  await knex(StaffObjectionOrmEntity.tableName).insert(superAdmin);
}
