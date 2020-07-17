import 'reflect-metadata';
import {
  createConnection,
  getConnection,
  getRepository,
  Not,
  Between,
} from 'typeorm';
import { Employee } from './entity/Employee';
import { Company } from './entity/Company';
import { Hobby } from './entity/Hobby';

createConnection()
  .then(async (connection) => {
    // select company by name

    const getCompanyByName = await getRepository(Company)
      .createQueryBuilder('company')
      .where('company.title = :title', { title: 'Microsoft' })
      .getOne();
    console.log(getCompanyByName);

    // //select companies where title != Google

    const companies = await connection.getRepository(Company).find({
      title: Not('Google'),
    });
    console.log(companies);

    // // select all companies and their employees;

    const companiesAndEmployees = await connection
      .getRepository(Company)
      .find({ relations: ['employees'] });
    console.log(companiesAndEmployees);

    // // select all hobbies and their employees

    const hobbiesAndEmployees = await connection
      .getRepository(Hobby)
      .find({ relations: ['employees'] });
    console.log(hobbiesAndEmployees);

    //select hobby and employee

    const employeeHobby = await connection.getRepository(Hobby).findOne({
      where: { title: 'Football' },
      relations: ['employees'],
    });
    console.log(employeeHobby);

    //select employees by age range

    const employeeByAge = await connection.getRepository(Employee).find({
      where: { age: Between(35, 45) },
    });
    console.log(employeeByAge);

    //select all companies and count amount of their employees

    const companyEmployyesAmount = await connection
      .getRepository(Company)
      .createQueryBuilder('company')
      .select('company.title')
      .loadRelationCountAndMap('company.employeesAmount', 'company.employees')
      .getMany();
    console.log(companyEmployyesAmount);
  })
  .catch((error) => console.log(error));
