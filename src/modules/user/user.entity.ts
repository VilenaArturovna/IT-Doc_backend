import { OrmEntityBase } from '@lib/base-classes/orm-entity.base';
import { Column, Entity, Index } from 'typeorm';
import { RoleType } from './types/role.type';

@Entity('user')
export class UserEntity extends OrmEntityBase {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  middleName: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  birthdate: Date;

  @Column({ nullable: true })
  photo: string | null;

  @Column({ type: 'enum', enum: RoleType })
  role: RoleType;

  @Column({ nullable: true })
  resetPasswordHash?: string | null;

  @Column({ nullable: true })
  inviteHash?: string | null;
}
