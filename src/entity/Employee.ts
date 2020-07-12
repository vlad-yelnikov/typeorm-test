import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { type } from 'os';
import { Company } from './Company';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  position: string;

  @ManyToOne((type) => Company, (company) => company.employees)
  company: Company;
}
