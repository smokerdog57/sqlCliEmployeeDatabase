// implement the following methods:
// Add other methods for your application here:
// async viewAllRoles() { ... }
// async viewAllEmployees() { ... 
// async addRole(roleData) { ... }
// async addEmployee(employeeData) { ... }
// async updateEmployeeRole(employeeId, roleId) { ... }

// Dependencies
import mysql from 'mysql2/promise';

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  // view all departments
  async viewAllDepartments() {
    try {
      const query = 'SELECT * FROM department'; // Query to retrieve all departments
      const [rows] = await this.connection.execute(query); // Execute the query
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // view all roles
  async viewAllRoles() {
    try {
      const query = `
      SELECT role.id, role.title, role.salary, department.name AS department_name
      FROM role
      JOIN department ON role.department_id = department.id`;
      const [rows] = await this.connection.execute(query); // Execute the query
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
  // view all employee
  async viewAllEmployees() {
    try {
      const query = `
        SELECT 
          employee.id, 
          employee.first_name, 
          employee.last_name, 
          role.title AS role_title, 
          role.salary AS role_salary, 
          department.name AS department_name,
          CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name,
          CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
      `;
      
      const [rows] = await this.connection.execute(query); // Execute the query
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
  //***********************************************************************************/
  // id INT AUTO_INCREMENT PRIMARY KEY,
  //   first_name VARCHAR(30),
  //   last_name VARCHAR(30),
  //   role_id INT,
  //   manager_id INT,    








  // add Department
  async addDepartment(departmentName) {
    try {
      const query = 'INSERT INTO department (name) VALUES (?)';
      const [result] = await this.connection.execute(query, [departmentName]);
      console.log(`Added department: ${departmentName}`);
      return result;
    } catch (error) {
      console.error('Error adding department:', error);
      throw error;
    }
  }

}

export default DB;