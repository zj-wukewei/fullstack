import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  alias: string;

  @Column()
  name: string;

  @Column()
  group: string;

  @Column('datetime')
  createDate: Date;
}
