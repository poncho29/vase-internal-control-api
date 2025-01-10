import { Company } from 'src/companies/entities/company.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  full_name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  department: string;

  @Column('text')
  city: string;

  @Column('text')
  address: string;

  @Column('text')
  phone: string;

  @Column('bool', { default: true })
  is_active: boolean;

  // Relations
  @ManyToOne(() => Company, (company) => company.customers)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
