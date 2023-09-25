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
// import { executeQuery } from './db/index.js';
// import { addDepartment } from './db/index.js';
// Prompt for desired query/update
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
            '7. update an employee role',
            '8. exit'
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
                            console.log(`ID: ${employee.id} | Name: ${employee. employee_name} |  
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
                    console.log('add role selected');
                    // addRole();
                    break;
                case '6. add an employee':
                    console.log('add employee selected');
                    // addEmployee();
                    break;
                case '7. update an employee role':
                    console.log('update employee role selected')
                    // updateEmployeeRole();
                    // call /db/index.js constructor method 
                    break;
                case '8. exit':
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