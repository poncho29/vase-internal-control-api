import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity({ name: 'companies' })
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  company_name: string;

  @Column('text')
  nit: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  address: string;

  @Column('text')
  phone: string;

  @Column('text')
  department: string;

  @Column('text')
  city: string;

  @Column('text', { nullable: true })
  url_logo: string;

  @Column('bool', { default: true })
  is_active: boolean;

  @Column('text', { nullable: true })
  legal_text: string;

  @Column('text', { nullable: true })
  paper_size: string;

  @Column('int', { default: 0 })
  print_format: number;

  @Column('text', { nullable: true })
  url_backup_db: string;

  // Relations
  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
