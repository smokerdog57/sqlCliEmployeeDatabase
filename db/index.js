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

  async addEmployee(firstName, lastName, roleTitle, managerFullName) {
    try {
      // Get the role ID based on the role title
      const roleId = await this.getRoleByTitle(roleTitle);
  
      let managerId = null; // Initialize managerId as null
  
      // Test for empty input
      if (managerFullName.trim().length === 0) {
        console.error(`Manager input is empty.`);
        return; // Return early if manager input is empty
      }
      // Test for "null" (case-insensitive)
      else if (managerFullName.trim().toLowerCase() === 'null') {
        // Leave managerId as null (do nothing)
      }
      // User entered managerFullName that is not empty and not "null"
      else {
        managerId = await this.getPersonByName(managerFullName);
  
        // Validate manager's name
        if (!managerId) {
          console.error(`Manager '${managerFullName}' not found.`);
          return; // Return early if the manager is not found
        }
      }
  
      // Insert the new employee into the database
      const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      const [result] = await this.connection.execute(query, [firstName, lastName, roleId, managerId]);
      console.log(`Added employee: ${firstName} ${lastName}`);
      return result;
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error;
    }
  }
  

  // Update an employee's role based on their full name and new role title
  async updateEmployeeRole(employeeFullName, employeeNewRole) {
    try {
      // Get the role ID based on the provided role title
      const roleId = await this.getRoleByTitle(employeeNewRole);

      // Fetch the employee ID based on the provided full name
      const employeeId = await this.getPersonByName(employeeFullName);

      if (!roleId) {
        console.error(`Role '${employeeRole}' not found.`);
        return;
      }

      if (!employeeId) {
        console.error(`Employee '${employeeFullName}' not found.`);
        return;
      }

      // Update the employee's role in the database
      const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
      const [result] = await this.connection.execute(query, [roleId, employeeId]);

      console.log(`Updated ${employeeFullName} with new role ${employeeNewRole}`);
      return result;
    } catch (error) {
      console.error('Error updating employee role:', error);
      throw error;
    }
  }
  // Bonus methods
  // Update Employee's Manager
  async updateEmployeeManager(employeeFullName, employeeNewManager) {
    try {
      // Fetch the employee ID based on the provided full employee name
      const employeeId = await this.getPersonByName(employeeFullName);
  
      let managerId = null; // Initialize managerId as null
  
      // Test for manager is empty
      if (employeeNewManager.trim().length === 0) {
        console.error(`Manager input is empty.`);
        return; // Return early if the manager is empty
      }
      
      // Test for manager is null
      else if (employeeNewManager.trim().toLowerCase() === 'null') {
        managerId = null;
      }
      
      // Test for manager is not empty and not null
      else {
        managerId = await this.getPersonByName(employeeNewManager);
        if (!managerId) {
          console.error(`Manager '${employeeNewManager}' not found.`);
          return; // Return early if the manager is not found
        }
      }
  
      // Update the employee's manager in the database
      const query = 'UPDATE employee SET manager_id = ? WHERE id = ?';
      const [result] = await this.connection.execute(query, [managerId, employeeId]);
  
      console.log(`Updated ${employeeFullName} with new manager ${employeeNewManager}`);
      return result;
    } catch (error) {
      console.error(`Error updating employee's manager:`, error);
      throw error;
    }
  }

  // Utility Methods
  // Department ID lookup
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

  // Role ID lookup
  async getRoleByTitle(roleTitle) {
    try {
      const query = 'SELECT id FROM role WHERE title = ?';
      const [rows] = await this.connection.execute(query, [roleTitle]);

      if (rows.length === 0) {
        // role not found
        return null;
      }

      // Return the role id
      return rows[0].id;
    } catch (error) {
      console.error('Error looking up role id', error);
      throw error;
    }
  }

  // Person ID lookup
  async getPersonByName(personFullName) {
    try {
      const query = 'SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = ?';
      const [result] = await this.connection.execute(query, [personFullName]);
      return result[0]?.id || null;
    } catch (error) {
      console.error('Error looking up person id', error);
      throw error;
    }
  }
}

export default DB;  // export DB class