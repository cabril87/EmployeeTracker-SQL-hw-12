const mysql = require('mysql')
const util = require('util')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employeeTracker_DB',
  });
  
  connection.connect() 
   
    // run the start function after the connection is made to prompt the user
    // start();
  connection.query = util.promisify(connection.query);

  module.exports = connection