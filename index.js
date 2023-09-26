// runtime dependencies:
// it is assumed that previous to executing this script from terminal the following cli commands are executed:
// 1. enter cli:  mysql -u root -p <when prompted enter password>
// 2. enter cli:  source /db/schema.sql
// 3. enter cli:  source /db/seed.sql
// 4. enter cli:  npm start

// import dependencies
import inquirer from 'inquirer';
import mysql from 'mysql2/promise';
import { createDatabaseConnection } from './db/connection.js';
import DB from './db/index.js';  // import the DB class and it's methods
// import { Query } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
console.clear();
const questions = [
    {
        type: 'list',
        name: 'query',
        message: 'Select the desired option',
        choices: [
            '1. view all departments',
            '2. view all roles',
            '3. view all employees',
            '4. add a department',
            '5. add a role',
            '6. add an employee',
            `7. update an employee's role`,
            `8. Bonus: update employee's manager`,
            '9. exit'
        ],
    },
];

async function main() {
    let continueApp = true; // while flag is true, app loops back to menu prompt after option work is completed.
    while (continueApp) { // Use a loop to keep the app running
        try {
            // Create a connection to MySQL with the correct database name
            const connection = await createDatabaseConnection();

            const answers = await inquirer.prompt(questions);

            // presetn choices to user and switch based on user's choice
            switch (answers.query) {
                case '1. view all departments':
                    try {
                        console.log('Viewing all departments:');
                        const db = new DB(connection); // Create an instance of the DB class
                        const departments = await db.viewAllDepartments();

                        // Display the departments in the terminal
                        departments.forEach((department) => {
                            console.log(`ID: ${department.id} | Name: ${department.name}`);
                        });
                    } catch (error) {
                        console.error('Error viewing departments', error);
                    }
                    break;
                case '2. view all roles':
                    try {
                        console.log('Viewing all roles:');
                        const db = new DB(connection); // Create an instance of the DB class
                        const departments = await db.viewAllRoles();

                        // Display the roles in the terminal
                        departments.forEach((role) => {
                            console.log(`ID: ${role.id} | Role: ${role.title} | Salary: ${role.salary} | Department: ${role.department_name}`);
                        });
                    } catch (error) {
                        console.error('Error viewing roles', error);
                    }
                    break;
                case '3. view all employees':
                    try {
                        console.log('Viewing all employees:');
                        const db = new DB(connection); // Create an instance of the DB class
                        const departments = await db.viewAllEmployees();
                        // Display the employees in the terminal
                        departments.forEach((employee) => {
                            console.log(`ID: ${employee.id} | Name: ${employee.employee_name} |  
                            Role: ${employee.role_title} | Salary: ${employee.role_salary} | Department: ${employee.department_name}
                             | Manager: ${employee.manager_name}`);
                        });
                    } catch (error) {
                        console.error('Error viewing employees', error);
                    }
                    break;
                case '4. add a department':
                    try {
                        console.log('Add a department:');
                        const departmentName = await inquirer.prompt({
                            type: 'input',
                            name: 'name',
                            message: 'Enter the name of the department:',
                        });
                        const db = new DB(connection);
                        await db.addDepartment(departmentName.name);
                    } catch (error) {
                        console.error('Error adding a department:', error);
                    }
                    break;
                case '5. add a role':
                    try {
                        console.log('Add a role:');
                        const roleTitle = await inquirer.prompt({
                            type: 'input',
                            name: 'title',
                            message: 'Enter the role title:',
                        });
                        const roleSalary = await inquirer.prompt({
                            type: 'input',
                            name: 'salary',
                            message: 'Enter the role salary:',
                        });
                        const roleDepartment = await inquirer.prompt({
                            type: 'input',
                            name: 'department',
                            message: 'Enter the role department',
                        });
                        const db = new DB(connection);
                        await db.addRole(roleTitle.title, roleSalary.salary, roleDepartment.department);
                    } catch (error) {
                        console.error('Error adding a department:', error);
                    }
                    break;
                case '6. add an employee':
                    try {
                        console.log('add an employee');
                        const employeeFirstName = await inquirer.prompt({
                            type: 'input',
                            name: 'firstName',
                            message: `Enter the employee's first name`,
                        });
                        const employeeLastName = await inquirer.prompt({
                            type: 'input',
                            name: 'lastName',
                            message: `Enter the employee's last name`,
                        });
                        const employeeRole = await inquirer.prompt({
                            type: 'input',
                            name: 'role',
                            message: `Enter the employee's role`,
                        });
                        const employeeManager = await inquirer.prompt({
                            type: 'input',
                            name: 'manager',
                            message: `Enter the employee's manager's full name or type null if employee has no manager`
                        });
                        const db = new DB(connection);
                        await db.addEmployee(employeeFirstName.firstName, employeeLastName.lastName, employeeRole.role, employeeManager.manager);
                    } catch (error) {
                        console.error('Error adding an employee', error);
                    }
                    break;
                case `7. update an employee's role`:
                    try {
                        console.log(`update an employee's role`);

                        // Fetch and display a list of employees' full names
                        const db = new DB(connection);
                        const employees = await db.viewAllEmployees();

                        if (employees.length === 0) {
                            console.log('No employees found. Please add employees before updating roles.');
                            break;
                        }

                        console.log('Select the employee whose role you would like to update:');
                        const employeeNames = employees.map((employee) => `${employee.first_name} ${employee.last_name}`);

                        const selectedEmployee = await inquirer.prompt({
                            type: 'list',
                            name: 'employeeFullName',
                            choices: employeeNames,
                            message: 'Select the employee whose role you would like to update:',
                        });

                        const employeeNewRole = await inquirer.prompt({
                            type: 'input',
                            name: 'newRole',
                            message: `Enter the employee's new role:`,
                        });

                        // Update the employee's role
                        await db.updateEmployeeRole(selectedEmployee.employeeFullName, employeeNewRole.newRole);

                        console.log('Employee role updated successfully.');
                    } catch (error) {
                        console.error('Error updating an employee role', error);
                    }
                    break;
                case `8. Bonus: update employee's manager`:
                    try {
                        console.log(`update an employee's manager`);

                        // Fetch and display a list of employees' full names
                        const db = new DB(connection);
                        const employees = await db.viewAllEmployees();

                        if (employees.length === 0) {
                            console.log('No employees found. Please load employees before updating manager.');
                            break;
                        }

                        console.log('Select the employee whose manager you would like to update:');
                        const employeeNames = employees.map((employee) => `${employee.first_name} ${employee.last_name}`);

                        const selectedEmployee = await inquirer.prompt({
                            type: 'list',
                            name: 'employeeFullName',
                            choices: employeeNames,
                            message: 'Select the employee whose manager you would like to update:',
                        });

                        const employeeNewManager = await inquirer.prompt({
                            type: 'input',
                            name: 'newManager',
                            message: `Enter the employee's manager's full name or type null if employee has no manager`
                        });

                        // Update the employee's manager
                        await db.updateEmployeeManager(selectedEmployee.employeeFullName, employeeNewManager.newManager);
                       
                    } catch (error) {
                        console.error(`Error updating an employee's manager`, error);
                    }
                    break;

                case '9. exit':
                    console.log('app has ended')
                    connection.end();    // close the database connection
                    continueApp = false; // Set the flag to exit the loop
                    process.exit();
                default:
                    console.error('Invalid option.');
                    return;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

main();