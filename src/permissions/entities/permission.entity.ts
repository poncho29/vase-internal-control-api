import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../../roles/entities/role.entity';

@Entity({ name: 'permissions' })
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  permission_name: string;

  @Column('bool', { default: true })
  read: boolean;

  @Column('bool', { default: true })
  create: boolean;

  @Column('bool', { default: true })
  update: boolean;

  @Column('bool', { default: true })
  delete: boolean;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
