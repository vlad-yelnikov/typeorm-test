import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { type } from 'os';
import { Employee } from './Employee';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany((type) => Employee, (employee) => employee.company)
  employees: Employee[];
}
