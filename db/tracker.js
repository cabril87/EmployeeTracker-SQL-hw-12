const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection
    }
    viewDepartment() {
        return this.connection.query('SELECT * FROM department')
    }
    viewRole() {
        return this.connection.query('SELECT * FROM role')
    }
    viewEmployee() {
        return this.connection.query('SELECT * FROM employee')
    }
    addRole(role) {
        return this.connection.query('INSERT INTO role SET ?', role)
    }
    addDepartment(department) {
        return this.connection.query('INSERT INTO department SET ?', department)
    }
    addEmployee(employee) {
        return this.connection.query('INSERT INTO employee SET ?', employee)
    }
    updateEmployeeRole(response) {
        return this.connection.query("UPDATE employee SET role_id = ? WHERE = ?", response.role_id)
    }

}

module.exports = new DB(connection)