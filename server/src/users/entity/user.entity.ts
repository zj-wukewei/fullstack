import { Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { UserInfo } from './user.info.entity';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column()
  password: string;

  @OneToOne(
    type => UserInfo,
    userInfo => userInfo.user,
  )
  info: UserInfo;

  @ManyToMany(type => Role)
  @JoinTable()
  roles: Role[];

  @Column('datetime')
  createDate: Date;
}
