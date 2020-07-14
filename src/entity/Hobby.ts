import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Employee } from './Employee';

@Entity({ name: 'hobbies' })
export class Hobby {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany((type) => Employee)
  @JoinTable({
    name: 'hobbies_employees',
    joinColumns: [{ name: 'hobby_id' }],
    inverseJoinColumns: [{ name: 'employee_id' }],
  })
  employees: Employee[];
}
