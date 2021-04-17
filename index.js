const inquirer = require('inquirer');
const { connection } = require('./db/tracker');
const DB = require('./db/tracker')

const start = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
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
                    addRole();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'View departments':
                    viewDepartment();
                    break;

                case 'View roles':
                    viewRole();
                    break;

                case 'View employee':
                    viewEmployee();
                    break;

                case 'Update employee roles':
                    updateEmployeeRole();
                    break;

                default:
                    connection.end();
            }
        });

};

const viewDepartment = () => {
    DB.viewDepartment().then(function (res) {
        console.table(res)
        start()
    })
};

const viewRole = () => {
    DB.viewRole().then(function (res) {
        console.table(res)
        start()
    })
};

const viewEmployee = () => {
    DB.viewEmployee().then(function (res) {
        console.table(res)
        start()
    })
};

const addDepartment = () => {
    inquirer
        .prompt({
            name: 'addDepartment',
            type: 'input',
            message: 'What department would you like to add?',
        })
        .then(answers => {
            const department = {
                name: answers.addDepartment
            }
            DB.addDepartment(department).then(res => {
                console.table(res)
                viewDepartment()

            })
        })
}
const addRole = async () => {
    const departmentView = await DB.viewDepartment();
    const departmentArray = departmentView.map(({ id, name }) => ({
        name: name,
        value: id

    }))
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
                type: 'rawlist',
                message: 'What id would you like to give this department?',
                choices: departmentArray
            }
        ]).then(answer => {
            // console.log(answer)
            const role = {
                title: answer.title,
                salary: answer.salary || 0,
                department_id: answer.department
            }
            DB.addRole(role).then(res => {
                console.table(res)
                viewRole()


            });

        })

}

const addEmployee = async () => {
    const role = await DB.viewRole();

    const roleArray = role.map(({ title, id }) => ({
        name: title,
        value: id
    }));

    const employee = await DB.viewEmployee();
    console.log(employee)
    const managers = employee.map(({ first_name, last_name, id }) => ({
        name: first_name + " " + last_name,
        value: id
    }))
    inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is the employee\'s first name?',
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is the employee\'s last name?',
            },
            {
                name: 'role_id',
                type: 'rawlist',
                message: 'What role would you like to give the employee?',
                choices: roleArray
            },
            {
                name: 'manager_id',
                type: 'rawlist',
                message: 'Who is the employee\'s manager?',
                choices: managers
            }
        ])

        .then(answer => {
            console.log(answer)
            const employee = {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id
            }
            DB.addEmployee(employee).then(res => {
                console.table(res)
                viewEmployee()

            })
        })


}
const updateEmployeeRole = async () => {
    const employee = await DB.viewEmployee();

    const employeeArray = employee.map(({ first_name, id }) => ({
        name: first_name,
        value: id
    }))

    inquirer
        .prompt([
            {
                name: 'employee',
                type: 'rawlist',
                message: 'What employee would you like to update?',
                choices: employeeArray
            },

            {
                name: 'role',
                type: 'input',
                message: 'What role would you like to give the employee?',

            }

        ])
        .then(res => {
            connection.query(`UPDATE employees SET role_id = ${res.role} WHERE id = ${res.employee}`,
                (err, res) => {
                    console.table(res);
                    start()
                }
            );
        })
}

start();