import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  appType: string;

  @Column('varchar')
  appModel: string;
}
