import { OrmEntityBase } from '@lib/base-classes/orm-entity.base';
import { Column, Entity, Index } from 'typeorm';
import { RoleType } from './types/role.type';

@Entity('user')
export class UserEntity extends OrmEntityBase {
  @Column({ nullable: true })
  firstname: string | null;

  @Column({ nullable: true })
  lastname: string | null;

  @Column({ nullable: true })
  middleName: string | null;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column({ nullable: true })
  password: string | null;

  @Column({ nullable: true })
  phone: string | null;

  @Column({ nullable: true })
  birthdate: Date | null;

  @Column({ nullable: true })
  photo: string | null;

  @Column({ type: 'enum', enum: RoleType })
  role: RoleType;

  @Column({ nullable: true })
  resetPasswordHash?: string | null;

  @Column({ nullable: true })
  inviteHash?: string;
}
