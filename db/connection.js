const mysql = require("mysql2/promise"); // Use promise-based API

async function createDatabaseConnection() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Big1blue!",
      database: "employees"
    });

    console.log("Connected to MySQL database!");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Rethrow the error to be handled by the calling code
  }
}

module.exports = createDatabaseConnection;