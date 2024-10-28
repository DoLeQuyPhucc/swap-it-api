require("dotenv").config();
const mysql = require("mysql2/promise");

//Database Local
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.MYSQL_DB,
//   // waitForConnections: true,
//   // connectionLimit: 10,
//   // queueLimit: 0
// });

//Database server
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:process.env.DB_PASS,
  database:process.env.MYSQL_DB,
  port:process.env.DB_PORT,
})
; 

module.exports = pool;

