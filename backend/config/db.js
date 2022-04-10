const mysql = require("mysql2");
//import mysql from "mysql2";
const dotenv = require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});
// Toutes les req sont sous forme de promise
module.exports = db.promise();
