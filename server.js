// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'bootcamp',
    // add correct Database
    database: 'company_db'
  },
  console.log(`Connected to the database.`)
);

promptUser();
// TODO: use inquirer to prompt the user 
// and see how they want to interact with the data
function promptUser () {
  inquirer
  .prompt([{
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee'],
    name: 'firstQuestion', 
  }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    if (answers.choices === 'View Departments') {
      db.query('SELECT * FROM departments', function (err, results) {
        console.log('Deparments:', results);
      });
    } else if (answers.choices === 'View Roles') {
      db.query('SELECT * FROM roles', function (err, results) {
        console.log('Roles:', results)
      });
    } else if (answers.choices === 'View Employees') {
      db.query('SELECT * FROM employees', function (err, results) {
        console.log('Employees:', results)
      });
    } else if (answers.choices === 'Add Department') {
      addDepartment(answers);
    } else if (answers.choices === 'Add Role') {
      addRole(answers);
    } else if (answers.choices === 'Add Employee') {
      addEmployee(answers);
    } else if (answers.choices === 'Update Employee') {
      updateEmployee(answers);
    }
  })  
  .catch((error) => {
    if (error.isError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
}

function addDepartment () {
  inquirer
  .prompt ([{
    type: 'input',
    message: 'What is the name of the department?',
    name: 'deptName',
  }
  ])
  .then((answers) => {
    db.query(`INSERT INTO departments(id, full_name) VALUES (${id}, ${answers})`, function (err, results) {
      console.log(`Added ${results} to the database.`)
    });
  })
  .catch((error) => {
    if (error.isError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
}

function addRole () {
  inquirer
  .prompt ([{
    type: 'input',
    message: 'What is the name of the role?',
    name: 'roleName',
  },
  {
    type: 'input',
    message: 'What is the salary of the role?',
    name: 'roleSalary',
  },
  {
    type: 'list',
    message: 'What department does the role belong to?',
    choices: ['Sales', 'Customer Service', 'Accounting', 'Human Resource', 'IT', 'Operations'],
    name: 'roleDept',
  }
  ])
  .then((answers) => {
    db.query(`INSERT INTO roles(id, title, salary, departments_id) VALUES (${id}, ${answers.roleName}, ${answers.roleSalary}, ${answers.roleDept})`, function (err, results) {
      console.log(`Added ${answers.roleName} to the database.`)
    });
  })
}

function addEmployee () {
  inquirer
  .prompt ([{
    type: 'input',
    message: "What is the employee's first name?",
    name: "firstName",
  },
  {
    type: 'input',
    message: "What is the employee's last name?",
    name: 'lastName',
  },
  {
    type: 'list',
    message: "What is the employee's role?",
    choices: ['Sales Manager', 'Sales Associate', 'Accountant', 'Junior Accountant', 'Customer Service Manager', 'Customer Service Rep', 'Software Engineer', 'Javascript Developer', 'Operations Manager', 'Outside Operations', 'Counselor', 'Associate Counselor'],
    name: 'empRole',
  },
  {
    type: 'list',
    message: "Who is the employee's manager?",
    choices: ['John', 'Gary', 'Test'],
    name: 'empManager',
  }
  ])
  .then((answers) => {
    db.query(`INSERT INTO employees(id, first_name, last_name, roles_id, manager_id) VALUES (${id}, ${answers.firstName}, ${answers.lastName}, ${answers.empRole}, ${answers.empManager})`, function (err, results) {
      console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
    })
  })
}

function updateEmployee () {
  inquirer
  .prompt ([{
    type: 'list',
    message: "Which employee's role do you want to update?",
    choices: [],
    name: 'empName',
  },
  ])
}


// TODO: Query database
// db.query('SELECT * FROM students', function (err, results) {
//   console.log('Student results:', results);
// });
