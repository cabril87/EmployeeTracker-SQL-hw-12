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
        'Add department',
        'Add role',
        'Add employee',
        'View departments',
        'View roles',
        'View employee',
        'Update employee roles',
        'Exit'
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Add department':
          addDepartment();
          break;

        case 'Add role':
          addRoles();
          break;

        case 'Add employee':
          addEmployee();
          break;

        case 'View departments':
          viewDepartment();
          break;

        case 'View roles':
          viewRoles();
          break;

        case 'View employee':
          viewEmployee();
          break;

        case 'Update employee roles':
          updateEmployee();
          break;

        default:
          quit()
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
    start();
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
          salary: answer.salary || 0,
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
  connection.query('SELECT * FROM role', (err, role) => {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(role);
    start();
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
        message: 'What role would you like to give the employee?',
      },
      {
        name: 'managerId',
        type: 'input',
        message: 'Who is the employee\'s manager?',
      }
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId
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
  connection.query('SELECT * FROM employee', (err, employee) => {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(employee);
    // connection.end();
    start()
  });

};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'eUpdate',
        type: 'input',
        message: 'Which employee would you like to update info on?',
      },
      {
        name: 'eRoleUpdate',
        type: 'input',
        message: 'What do you want to update?',
      }
    ])
    .then((answer) => {
      connection.query('INSERT INTO employee SET role_id = ? WHERE first_name = ?',
        [
          answer.eRoleUpdate,
          answer.eUpdate
        ],
        (err) => {
          if (err) throw err;
          console.log('You employee was updated');
          start();
        }
      )
    });
};
const quit = () => {
  connection.end();
}
// 