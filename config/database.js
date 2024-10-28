require("dotenv").config();
const mysql = require("mysql2/promise");
//const mysql = require('mysql2');
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0
});

module.exports = pool;
