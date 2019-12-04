import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('datetime')
  createDate: Date;
}
