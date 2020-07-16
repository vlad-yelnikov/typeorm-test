import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get(':id')
  get(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.get(id);
  }

  @Get()
  getAll(): Promise<Employee[]> {
    return this.employeeService.getAll();
  }

  @Post()
  create(@Body() body: Employee): Promise<void> {
    return this.employeeService.create(body);
  }

  @Put(':id')
  update(@Param(':id') id: string, @Body() body: Employee): Promise<void> {
    return this.employeeService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.employeeService.delete(id);
  }
}
