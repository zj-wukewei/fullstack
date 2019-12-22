import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from '../../permission/entity/permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  describe?: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions?: Permission[];

  @Column('datetime')
  createDate!: Date;
}
