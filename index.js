// runtime dependencies:
// it is assumed that previous to executing this script from terminal the following cli commands are executed:
// 1. enter cli:  mysql -u root -p <when prompted enter password>
// 2. enter cli:  source /db/schema.sql
// 3. enter cli:  source /db/seed.sql
// 4. enter cli:  npm start

// import dependencies

import inquirer from 'inquirer';
import mysql from 'mysql2/promise';
import { Query } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
import { executeQuery } from './db/index.js';
import { addDepartment } from './db/index.js';
import { createDatabaseConnection } from './db/connection.js';

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
                case '2. view all roles':
                case '3. view all employees':
                    console.log('case 1, 2, or 3 picked');
                    // call executeQuery from /db/index.js constructor method to view all departments, view roles, or view employees.
                    break;
                case '4. add a department':
                    console.log('add department selected');
                    addDepartment();
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

async function addDepartment() {
    const departmentName = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
    });

    // Call the appropriate database function to add the department
    await db.addDepartment(departmentName.name);
    console.log(`Added ${departmentName.name} to the database`)
}

main();