// import dependencies

import inquirer from 'inquirer';
import mysql from 'mysql2/promise';

// Import all schema-related constant functions
import {
    dropDatabase,
    createDatabase,
    useDatabase,
    dbConfig,
    createDepartmentTable,
    createRoleTable,
    createEmployeeTable,
} from './db/schema.js';

import {
    seedEmployeeTable,
    seedDepartmentTable,
    seedRoleTable,
} from './db/seeds.js';

import { executeQuery } from './db/query.js';

// Prompt for desired query/update
const questions = [
    {
        type: 'list',
        name: 'query',
        message: 'Select the desired query',
        choices: [
            '1. view all departments',
            '2. view all roles',
            '3. view all employees',
            '4. add a department',
            '5. add a role',
            '6. add an employee',
            '7. update an employee role',
        ],
    },
];

async function startApp() {
    try {
        // Create a connection to MySQL with the correct database name
        const connection = await mysql.createConnection({ ...dbConfig, Promise: mysql.Promise });

        // Create the database and use it
        await connection.query(dropDatabase);
        await connection.query(createDatabase);
        await connection.query(useDatabase);

        // Create the database tables
        await connection.query(createDepartmentTable);
        await connection.query(createRoleTable);
        await connection.query(createEmployeeTable);

        // Seed the database
        await connection.query(seedDepartmentTable);
        await connection.query(seedRoleTable);
        await connection.query(seedEmployeeTable);

        const answers = await inquirer.prompt(questions);

        // Switch based on user's choice
        switch (answers.query) {
            case '1. view all departments':
            case '2. view all roles':
            case '3. view all employees':
                const results = await executeQuery(connection, answers.query);
                console.log(results);
                console.log('case 1, 2, or 3 picked');
                break;

            case '4. add a department':
            case '5. add a role':
            case '6. add an employee':
                // Execute update function
                console.log('case 4, 5, 6 picked');
                break;

            default:
                console.error('Invalid option.');
                return;
        }
    } catch (error) {
        console.error(error);
    }
}

startApp();