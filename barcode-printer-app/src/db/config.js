const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: 'localhost',
  database: 'BarcodeDB',
  options: {
    trustServerCertificate: true
  }
};

module.exports = new sql.ConnectionPool(config).connect();
