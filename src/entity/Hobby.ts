import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Employee } from './Employee';

@Entity()
export class Hobby {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany((type) => Employee)
  @JoinTable()
  employees: Employee[];
}