import {CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export abstract class OrmEntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamptz',
    update: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt: Date;
}
