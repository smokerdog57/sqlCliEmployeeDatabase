# SQL Command Line Employee Database

### Link to GitHub repository:  https://github.com/smokerdog57/sqlCliEmployeeDatabase
### Castify link:   			https://drive.google.com/file/d/1b0WAr-gKa41xN-eCCG-6maMv_Td1v8A4/view

## Badges
    
![github](https://img.shields.io/badge/github-Profile-lightgrey.svg) ![jses6](https://img.shields.io/badge/JavaScript--ES6-yellow.svg) ![node.js](https://img.shields.io/badge/node.js-12.0-green.svg) ![npm](https://img.shields.io/badge/npm-6.14.4-blue.svg) 

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Requirements](#requirements)
- [Mock-up](#mock-up)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Description

This app is a command-line content management application designed to manage a company's employee database, using Node.js, Inquirer, and MySQL. It uses a combination of sql and js files.  The user is presented with options (inquirer prompt) to query and update the database.  
 
Upon entering the cli command:  mysql -u root -p, sql commands are now accomodated from the command line.  The user then enters the source ./db/schema.sql which drops employees database, if it exists, and then recreates and uses the employees database.  The table schemas for department, role, and employee tables are created.  The department table is at the top of the pyramid.  The department id is the department table primary key and is related to the role table through the department id which is a foreign key within the role table.  The role id is the role table primary key and is related to the employee table through the role id which is a foreign key within the employee table.

Upon entering the cli command ./db/seed.sql, the employee database is initialized with sample data, including employees, departments, and roles. This seed data matches the table schema that it is being inserted into.

Upon entering the cli command npm start, the /index.js script is executed. Index.js establishes a connection to the employees database using the connection.js script. The user is then asked to choose one of following options using the inquirer prompt library:

	1. view all departments
	2. view all roles
	3. view all employees
	4. add a department
	5. add a role
	6. add an employee
	7. update an employee's role
	8. exit

The user then selects an option from the command line.  If one of options 1 through 7 are picked, control is passed to the /db/index.js script.  This script includes a db class with a constructor and a method to do the work for each option.  The results of the work is then returned to /index.js and displayed at the command line.  The user is then presented with the options again.  If exit option is picked, the index.js script is terminated.

## Installation
  
1. create a new github repository named 'sqlCliEmployeeDatabase'
2. launch microsoft visual studio Code app
3. enter cli:  cd ~/bootcamp/homework
4. enter cli:  git clone <repository> // creates sqlCliEmployeeDatabase directory
5. enter cli:  cd sqlCliEmployeeDatabase
6. enter cli:  npm init
7. enter cli:  npm install --save mysql2
8. enter cli:  npm install inquirer@8.2.4
9. enter cli:  npm install cli-table --save
10. After running above steps create, copy and/or confirm the following directory structure and files:
	assets			// copy from challenge
	db
	   connection.js	// create new file
	   index.js			// create new file	   
	   schema.sql		// create new file
	   seed.sql			// create new file   
	index.js			// create new file
	node_modules		// confirm: created by npm			
	.gitignore			// create new file
	package-lock.json	// confirm: created by npm	
	package.json		// confirm: created by npm
	README.md			// copy from challenge
	
## Usage

1. open MS Visual Studio and terminal
2. enter cli:  cd homework/sqlCliEmployeeDatabase
2. enter cli:  mysql -u root -p <when prompted enter password>
3. enter cli:  source ./db/schema.sql
4. enter cli:  source ./db/seed.sql
5. open a second MS Visual Studio terminal session
6. enter cli:  cd homework/sqlCliEmployeeDatabase
7. enter cli:  npm start

to see the castify video:  https://drive.google.com/file/d/1b0WAr-gKa41xN-eCCG-6maMv_Td1v8A4/view

## Requirements
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
WHEN I enter one choice and the terminal has updated with the results based on that choice, 
THEN I am prompted with the options again
WHEN I choose the exit option, 
THEN the /index.js script is terminated.
```

## Mock-Up

The following video shows an example of the application being used from the command line:
xxxxxx


## License

github, jses6, express.js
https://opensource.org/licenses/MIT

npm
https://opensource.org/licenses/Artistic-2.0


- - -
© 2023 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.

## Contributing

1. Sandy Smith (tutor):  Sandy helped me understand the acceptance criteria.

## Tests

```
Test001: execute schema.sql, then verify employees db is created and table schemas are properly created.
Test002: execute seed.sql, then verify the employees db is seeded with the starter date.
Test003: execute npm start, then select the first option, view all departments and verify the departments are logged to the terminal.
Test004: execute npm start, then select the second option, view all roles and verify the roles are logged to the terminal.
Test005: execute npm start, then select the third option, view all employees and verify the employees are logged to the terminal.
Test006: execute npm start, then select the fourth option, add a department and verify the new department is added.
Test007: execute npm start, then select the fifth option, add a role and verify the new role is added.
Test008: execute npm start, then select the sixth option, add an employee and verify the new employee is added.
Test009: execute npm start, then select the seventh option, update an employee's role and verify the employee's role is updated.
Test010: execute npm start, then select the eighth option, verify the app is exited and terminal prompt is displayed.
```

## Questions
  
### Github username
smokerdog57

### Github url
https://github.com/smokerdog57/sqlCliEmployeeDatabase
  
### Contact me
email: smokerdog57@gmail.com
phone: 941-221-1132
