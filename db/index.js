// Dependencies
import mysql from 'mysql2/promise';

// DB Class, Constructor and methods
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

  // add role
  async addRole(title, salary, departmentName) {
    try {
      // Look up the department ID based on the entered department name
      const departmentId = await this.getDepartmentByName(departmentName);
  
      if (!departmentId) {
        console.error(`Department '${departmentName}' not found.`);
        return; // Return early if department not found
      }
  
      const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      const [result] = await this.connection.execute(query, [title, salary, departmentId]);
  
      console.log(`Added role: ${title}`);
      return result;
    } catch (error) {
      console.error('Error adding role:', error);
      throw error;
    }
  }
  
  
  // add an employee
  async addEmployee(employeeName) {
    try {
      const query = 'INSERT INTO employee (name) VALUES (?)';
      const [result] = await this.connection.execute(query, [employeeName]);
      console.log(`Added role: ${employeeName}`);
      return result;
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error;
    }
  }
  // update an employee's role   - this method prompts user (in main program) with list of employees, the user selects the employee from the list and then prompts for the
  // the new role. this method accepts the employee name and role title as inputs and then modifies the employee table to update the affected columns:  role_id and manager_id.
  // async updateEmployeeRole(employeeName,employeeRole) {
  //   try {
  //     const query = 'INSERT INTO employee (name) VALUES (?)';
  //     const [result] = await this.connection.execute(query, [employeeRole]);
  //     console.log(`Added role: ${employeeRole}`);
  //     return result;
  //   } catch (error) {
  //     console.error('Error updating employee role:', error);
  //     throw error;
  //   }
  // }


  async getDepartmentByName(departmentName) {
    try {
      const query = 'SELECT id FROM department WHERE name = ?';
      const [rows] = await this.connection.execute(query, [departmentName]);

      if (rows.length === 0) {
        // Department not found
        return null;
      }

      // Return the department id
      return rows[0].id;
    } catch (error) {
      console.error('Error looking up department id', error);
      throw error;
    }
  }
};

export default DB;  // export DB class