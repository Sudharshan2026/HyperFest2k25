  const mysql = require('mysql2/promise');

  const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Kathir123',
    database: 'hyperFest2k25',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  module.exports = connection;