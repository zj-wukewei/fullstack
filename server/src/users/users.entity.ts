import { Column, Entity, PrimaryGeneratedColumn, Table } from 'typeorm';

@Entity("share_user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('phone')
  phone: string;

  @Column('app_type')
  appType: string
 
  @Column('app_model')
  appModel: string


}