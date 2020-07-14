import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from './Company';

@Entity({ name: 'employees' })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  age: number;

  @Column()
  position: string;

  @ManyToOne((type) => Company, (company) => company.employees)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
