import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Role } from '../../role/entity/role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  alias!: string;

  @Column()
  name!: string;

  @Column()
  group!: string;

  @ManyToMany(
    () => Role,
    role => role.permissions,
  )
  roles?: Role[];

  @Column('datetime')
  createDate!: Date;
}
