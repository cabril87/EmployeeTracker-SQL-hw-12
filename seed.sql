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
('Jerry', 'Springer', 1, 1),
('James', 'Brown', 1, 3),
('Phi', 'Long', 3, 2),
('Colby', 'Wake', 4, 2),
('Sherry', 'Colt', 2, 1),
('Vanessa', 'Valdez', 2, 4),
('Jacob', 'Tall', 2, 2),
('Vinny', 'Calbo', 3, 3);