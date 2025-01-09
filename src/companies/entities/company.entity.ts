import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'companies' })
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  companyName: string;

  @Column('text')
  managerName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  address: string;

  @Column('text')
  phone: string;

  @Column('text')
  department: string;

  @Column('text')
  city: string;

  @Column('text')
  legalText: string;

  @Column('text')
  urlLogo: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('text', { nullable: true })
  paperSize: string;

  @Column('int', { default: 0 })
  printFormat: number;

  @Column('text', { nullable: true })
  urlBackupDB: string;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
