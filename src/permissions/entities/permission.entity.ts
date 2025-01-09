import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../../roles/entities/role.entity';

@Entity({ name: 'permissions' })
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  permission_name: string;

  @Column('bool', { default: true })
  read: boolean;

  @Column('bool', { default: true })
  create: boolean;

  @Column('bool', { default: true })
  update: boolean;

  @Column('bool', { default: true })
  delete: boolean;

  @Column('bool', { default: true })
  is_active: boolean;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
