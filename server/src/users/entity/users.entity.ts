import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { UserInfo } from './user.info.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @OneToOne(type => UserInfo, userInfo => userInfo.user)
  info: UserInfo;

  @Column('datetime')
  createDate: Date;
}
