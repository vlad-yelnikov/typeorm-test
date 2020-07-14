import 'reflect-metadata';
import { createConnection, getConnection, getRepository, Not } from 'typeorm';
import { Employee } from './entity/Employee';
import { Company } from './entity/Company';
import { Hobby } from './entity/Hobby';

createConnection()
  .then(async (connection) => {
    //insert companies

    const company1 = new Company();
    company1.title = 'Microsoft';
    await connection.manager.save(company1);

    const company2 = new Company();
    company2.title = 'Amazon';
    await connection.manager.save(company2);

    const company3 = new Company();
    company3.title = 'Google';
    await connection.manager.save(company3);

    const company4 = new Company();
    company4.title = 'Netflix';
    await connection.manager.save(company4);

    //insert employees

    const employee1 = new Employee();
    employee1.firstName = 'Alex';
    employee1.lastName = 'Jackson';
    employee1.age = 25;
    employee1.position = 'engineer';
    employee1.company = company2;
    await connection.manager.save(employee1);

    const employee2 = new Employee();
    employee2.firstName = 'Tom';
    employee2.lastName = 'Sawyer';
    employee2.age = 34;
    employee2.position = 'manager';
    employee2.company = company1;
    await connection.manager.save(employee2);

    const employee3 = new Employee();
    employee3.firstName = 'Jack';
    employee3.lastName = 'Johnson';
    employee3.age = 47;
    employee3.position = 'engineer';
    employee3.company = company3;
    await connection.manager.save(employee3);

    const employee4 = new Employee();
    employee4.firstName = 'Chris';
    employee4.lastName = 'Show';
    employee4.age = 29;
    employee4.position = 'engineer';
    employee4.company = company4;
    await connection.manager.save(employee4);

    const employee5 = new Employee();
    employee5.firstName = 'Alex';
    employee5.lastName = 'Trump';
    employee5.age = 22;
    employee5.position = 'engineer';
    employee5.company = company2;
    await connection.manager.save(employee5);

    const employee6 = new Employee();
    employee6.firstName = 'Mary';
    employee6.lastName = 'Bolton';
    employee6.age = 34;
    employee6.position = 'manager';
    employee6.company = company1;
    await connection.manager.save(employee6);

    const employee7 = new Employee();
    employee7.firstName = 'John';
    employee7.lastName = 'Doe';
    employee7.age = 41;
    employee7.position = 'engineer';
    employee7.company = company2;
    await connection.manager.save(employee7);

    const employee8 = new Employee();
    employee8.firstName = 'Anna';
    employee8.lastName = 'Show';
    employee8.age = 39;
    employee8.position = 'busyness analyst';
    employee8.company = company4;
    await connection.manager.save(employee8);

    //insert hobbies

    const hobby1 = new Hobby();
    hobby1.title = 'Video games';
    hobby1.employees = [employee1, employee2, employee3, employee4];
    await connection.manager.save(hobby1);

    const hobby2 = new Hobby();
    hobby2.title = 'Card games';
    hobby2.employees = [employee3, employee4, employee8];
    await connection.manager.save(hobby2);

    const hobby3 = new Hobby();
    hobby3.title = 'Football';
    hobby3.employees = [employee2, employee4, employee5];
    await connection.manager.save(hobby3);

    const hobby4 = new Hobby();
    hobby4.title = 'Swimming';
    hobby4.employees = [employee2, employee3, employee6, employee7];
    await connection.manager.save(hobby4);

    // select company by name

    const getCompanyByName = await getRepository(Company)
      .createQueryBuilder('company')
      .where('company.title = :title', { title: 'Microsoft' })
      .getOne();
    console.log(getCompanyByName);

    //select companies where title != Google

    const companies = await connection.getRepository(Company).find({
      title: Not('Google'),
    });
    console.log(companies);

    //select all companies and their employees;

    const companiesAndEmployees = await connection
      .getRepository(Company)
      .find({ relations: ['employees'] });
    console.log(companiesAndEmployees);

    //select all hobbies and their employees

    const hobbiesAndEmployees = await connection
      .getRepository(Hobby)
      .find({ relations: ['employees'] });
    console.log(hobbiesAndEmployees);

    //update employee

    await connection.manager
      .createQueryBuilder()
      .update(Employee)
      .set({ company: company2 })
      .where('id = :id', { id: 4 })
      .execute();
    console.log('Added new employee to ' + company2.title);
  })
  .catch((error) => console.log(error));
