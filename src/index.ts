import 'reflect-metadata';
import { createConnection, getConnection, getRepository } from 'typeorm';
import { Employee } from './entity/Employee';
import { Company } from './entity/Company';
import { Hobby } from './entity/Hobby';

createConnection()
  .then(async (connection) => {
    const employee1 = await getRepository(Employee)
      .createQueryBuilder('employee')
      .where('employee.id = :id', { id: 3 })
      .getOne();
    console.log('Get employee with id: ' + employee1.id);

    const employee2 = await getRepository(Employee)
      .createQueryBuilder('employee')
      .where('employee.id = :id', { id: 4 })
      .getOne();
    console.log('Get employee with id: ' + employee2.id);

    const employee3 = await getRepository(Employee)
      .createQueryBuilder('employee')
      .where('employee.id = :id', { id: 5 })
      .getOne();
    console.log('Get employee with id: ' + employee3.id);

    const employee4 = await getRepository(Employee)
      .createQueryBuilder('employee')
      .where('employee.id = :id', { id: 6 })
      .getOne();
    console.log('Get employee with id: ' + employee4.id);

    // const hobby1 = new Hobby();
    // hobby1.title = 'Baseball';
    // hobby1.employees = [employee1, employee4];
    // await connection.manager.save(hobby1);
    // console.log('Saved a new hobby with id: ' + hobby1.id);

    // const hobby2 = new Hobby();
    // hobby2.title = 'Swimming';
    // hobby2.employees = [employee3, employee4];
    // await connection.manager.save(hobby2);
    // console.log('Saved a new hobby with id: ' + hobby2.id);

    // const hobby3 = new Hobby();
    // hobby3.title = 'Books';
    // hobby3.employees = [employee2, employee4];
    // await connection.manager.save(hobby3);
    // console.log('Saved a new hobby with id: ' + hobby3.id);

    // const hobby4 = new Hobby();
    // hobby4.title = 'Card games';
    // hobby4.employees = [employee1, employee3]
    // await connection.manager.save(hobby4);
    // console.log('Saved a new hobby with id: ' + hobby4.id);
    // const company2 = await getConnection()
    //     .createQueryBuilder()
    //     .select('id')
    //     .from(Company, 'id')
    //     .where('id = :id', { id: 2 })
    //     .getOne();

    await connection.manager
      .createQueryBuilder()
      .update(Company)
      .set({ employees: [employee2, employee3] })
      .where('id = :id', { id: 2 })
      .execute();
      console.log('Add new employee to company');

    // const company1 = await getRepository(Company)
    //   .createQueryBuilder('company')
    //   .where('company.id = :id', { id: 3 })
    //   .getOne();
    // console.log('Get employee with id: ' + company1.id);

    //     const company2 = new Company();
    //     company2.title = 'Amazon';
    //     await connection.manager.save(company2);
    //     console.log('Saved a new employee with id: ' + company2.id);

    //     const company3 = new Company();
    //     company3.title = 'Google';
    //     await connection.manager.save(company3);
    //     console.log('Saved a new employee with id: ' + company3.id);

    //     const company4 = new Company();
    //     company4.title = 'Netflix';
    //     await connection.manager.save(company4);
    //     console.log('Saved a new employee with id: ' + company4.id);

    //     const employee = new Employee();
    //     employee.firstName = 'Jack';
    //     employee.lastName = 'Dowson';
    //     employee.age = 27;
    //     employee.position = 'engineer';
    //     employee.company = company1;
    //     await connection.manager.save(employee);
    //     console.log('Saved a new employee with id: ' + employee.id);

    //     const employee2 = new Employee();
    //     employee2.firstName = 'John';
    //     employee2.lastName = 'Jackson';
    //     employee2.age = 54;
    //     employee2.position = 'manager';
    //     await connection.manager.save(employee2);
    //     console.log('Saved a new employee with id: ' + employee2.id);

    //     const employee3 = new Employee();
    //     employee3.firstName = 'Tom';
    //     employee3.lastName = 'Sawyer';
    //     employee3.age = 37;
    //     employee3.position = 'engineer';
    //     await connection.manager.save(employee3);
    //     console.log('Saved a new employee with id: ' + employee3.id);

    //     const employee4 = new Employee();
    //     employee4.firstName = 'Sara';
    //     employee4.lastName = 'Johnson';
    //     employee4.age = 29;
    //     employee4.position = 'engineer';
    //     await connection.manager.save(employee4);
    //     console.log('Saved a new employee with id: ' + employee4.id);
  })
  .catch((error) => console.log(error));
