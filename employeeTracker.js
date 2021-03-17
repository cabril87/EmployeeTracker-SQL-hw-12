const mysql = require('mysql');
const inquirer = require('inquirer');

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'employeeTracker_DB',
});

connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

const start = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'Would you like to do?',
      choices: [
        'Add departments',
        'Add roles',
        'Add employees',
        'View departments',
        'View roles',
        'View employees',
        'Update employee roles',
        'Exit'
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Add departments':
          addDepartment();
          break;

        case 'Add roles':
          addRoles();
          break;

        case 'Add employees':
          addEmployee();
          break;

        case 'View departments':
          viewDepartment();
          break;

        case 'View roles':
          viewRoles();
          break;

        case 'View employees':
          viewEmployee();
          break;

        case 'Update employee roles':
          updateEmployee();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`)
      }
    });

};

const addDepartment = () => {
  inquirer
    .prompt({
      name: 'addDepartment',
      type: 'input',
      message: 'What department would you like to add?',
    })
    .then((answer) => {
      connection.query(
        'INSERT INTO department SET ?',
        {
          name: answer.addDepartment
        },
        (err) => {
          if (err) throw err;
          console.log('You department was successfully created');
          start();
        }
      )
    });
};

const viewDepartment = () => {
  connection.query('SELECT * FROM department', (err, dep) => {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(dep);
    connection.end();
  });

};

const addRoles = () => {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'What roles would you like to add?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What salary would you like to set for this role?',
      },
      {
        name: 'department',
        type: 'input',
        message: 'What id would you like to give this department?',
      }
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO role SET ?',
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department
        },
        (err) => {
          if (err) throw err;
          console.log('You department was successfully created');
          start();
        }
      )
    });
};

const viewRoles = () => {
  connection.query('SELECT * FROM role', (err, dep) => {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(dep);
    connection.end();
  });

};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'What is the employee\'s first name?',
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'What is the employee\'s last name?',
      },
      {
        name: 'roleId',
        type: 'input',
        message: 'What id would you like to give this employee?',
      },
      {
        name: 'managerId',
        type: 'input',
        message: 'What id would you like to give this department?',
      }
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO role SET ?',
        {
          first_name: answer.title,
          last_name: answer.salary,
          role_id: answer.department,
          manager_id: answer.department
        },
        (err) => {
          if (err) throw err;
          console.log('You department was successfully created');
          start();
        }
      )
    });
};

const viewEmployee = () => {
  connection.query('SELECT * FROM employee', (err, dep) => {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(dep);
    connection.end();
  });

};



