import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  age: number;

  @JoinColumn()
  @OneToOne(
    type => User,
    user => user.info,
    {
      cascade: true,
    },
  )
  user: User;

  @Column('datetime')
  createDate: Date;
}
