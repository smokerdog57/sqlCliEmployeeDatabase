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

  // Function to view all departments
  async viewAllDepartments() {
    try {
      const query = 'SELECT * FROM department'; // Query to retrieve all departments
      const [rows] = await this.connection.execute(query); // Execute the query
      return rows;
    } catch (error) {
      throw error;
    }
  }

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