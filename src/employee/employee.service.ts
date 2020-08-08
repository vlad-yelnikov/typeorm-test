import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {}

  public async get(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne(id);
    return employee;
  }

  public async getAll(): Promise<Employee[]> {
    const employees = await this.employeeRepository.find();
    return employees;
  }

  public async create(body: Employee): Promise<void> {
    const employee = this.employeeRepository.create(body);
    await this.employeeRepository.save(employee);
  }

  public async update(id: string, body: Employee): Promise<void> {
    await this.employeeRepository.update(id, body);
  }

  public async delete(id: string): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
