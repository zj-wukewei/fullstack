import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from '../../permission/entity/permission.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  describe?: string;

  @ManyToMany(
    () => Permission,
    permission => permission.roles,
  )
  @JoinTable()
  permissions?: Permission[];

  @ManyToMany(
    () => User,
    user => user.roles,
  )
  @JoinTable()
  user?: User[];

  @Column('datetime')
  createDate!: Date;
}
