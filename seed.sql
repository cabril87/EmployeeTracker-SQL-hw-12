USE employeeTracker_DB;

INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Administration'), ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES 
('Sales rep', 40000, 1),
('Software Engineer',75000, 2),
('Manager', 50000, 3),
('Front Desk Clerk', 35000, 3),
('Accountant', 65000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jerry', 'Springer', 1, 3),
('James', 'Brown', 4, 3),
('Phi', 'Long', 3, NULL),
('Zach', 'Brown', 2, NULL),
('Joe', 'Seequal', 5, 3)
