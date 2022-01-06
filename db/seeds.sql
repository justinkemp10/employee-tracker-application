INSERT INTO departments (id, department_name)
VALUES (1, 'Sales'),
       (2, 'Customer Service'),
       (3, 'Accounting'),
       (4, 'Human Resource'),
       (5, 'IT'),
       (6, 'Operations');
       
INSERT INTO roles (id, title, salary, department_id)
VALUES (1, 'Sales Manager', 80000, 1),
       (2, 'Sales Associate', 55000, 1),
       (3, 'Accountant', 65000, 3),
       (4, 'Junior Accountant', 45000, 3),
       (5, 'Customer Service Rep', 35000, 2),
       (6, 'Software Engineer', 80000, 5),
       (7, 'Javascript Developer', 55000, 5),
       (8, 'Operations Manager', 50000, 6),
       (9, 'Outside Operations', 32500, 6),
       (10, 'Customer Service Manager', 55000, 2),
       (11, 'Counselor', 60000, 4),
       (12, 'Associate Counselor', 45000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Justin', 'Kemp', 7, 2),
       (2, 'Austin', 'Riley', 6, NULL),
       (3, 'Chipper', 'Jones', 8, NULL),
       (4, 'Max', 'Fried', 9, 3),
       (5, 'Ronnie', 'Acuna', 10, NULL),
       (6, 'Ozzie', 'Albies', 11, NULL),
       (7, 'Tyler', 'Matzek', 12, 6),
       (8, 'Luke', 'Jackson', 4, 10),
       (9, 'Brian', 'Snitker', 5, 5),
       (10, 'Joc', 'Pederson', 3, NULL),
       (11, 'Jorge', 'Soler', 1, NULL), 
       (12, 'Will', 'Smith', 2, 11);