// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "bootcamp",
    // add correct Database
    database: "company_db",
  },
  console.log(`Connected to the database.`)
);

promptUser();
// TODO: use inquirer to prompt the user
// and see how they want to interact with the data
function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Departments",
          "View Roles",
          "View Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee",
          "Quit",
        ],
        name: "firstQuestion",
      },
    ])
    .then((answers) => {
      // Use user feedback for... whatever!!
      switch (answers.firstQuestion.toUpperCase()) {
        case "VIEW DEPARTMENTS":
          viewDepartments();
          break;
        case "VIEW ROLES":
          viewRoles();
          break;
        case "VIEW EMPLOYEES":
          viewEmployees();
          break;
        case "ADD DEPARTMENT":
          addDepartment();
          break;
        case "ADD ROLE":
          addRole();
          break;
        case "ADD EMPLOYEE":
          addEmployee();
          break;
        case "UPDATE EMPLOYEE":
          updateEmployee();
          break;
        default:
          process.exit();
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

function viewDepartments() {
  console.log("View Departments");
  db.query("SELECT * FROM departments", function (err, results) {
    console.table(results);
    promptUser();
  });
}

function viewRoles() {
  db.query("SELECT * FROM roles", function (err, results) {
    console.table(results);
    promptUser();
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employees", function (err, results) {
    console.table(results);
    promptUser();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "deptName",
      },
    ])
    .then((answers) => {
      const sql = `INSERT INTO departments (department_name)
      VALUES (?)`;
      db.query(sql, answers.deptName, function () {
        console.log(`Added ${answers.deptName} to the database.`);
        viewDepartments();
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

function addRole() {
  let departments = [];
  // Do a query of the departments table to retrieve the id & name
  // of all available departments & save the result in a variable
  // and iterate each object & store them in an array
  // of objects following this format
  db.query("SELECT * FROM departments", function (err, results) {
    for (const dept of results) {
      departments.push({
        name: dept.department_name,
        value: dept.id,
      });
    }

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the role?",
          name: "roleName",
        },
        {
          type: "input",
          message: "What is the salary of the role?",
          name: "roleSalary",
        },
        {
          type: "list",
          message: "Select Department Name",
          choices: departments,
          name: "roleDept",
        },
      ])
      .then((answers) => {
        db.query(
          `INSERT INTO roles(title, salary, department_id) VALUES ('${answers.roleName}', '${answers.roleSalary}', '${answers.roleDept}')`,
          function () {
            console.log(`Added ${answers.roleName} to the database.`);
            viewRoles();
          }
        );
      });
  });
}

function addEmployee() {
  let roles = [];
  let managers = [];
  db.query("SELECT * FROM roles", function (err, results) {
    for (const role of results) {
      roles.push({
        name: role.title,
        value: role.id,
      });
    }
    db.query(
      "SELECT * FROM employees WHERE manager_id IS NULL",
      function (err, results) {
        for (const manager of results) {
          managers.push({
            name: manager.first_name + " " + manager.last_name,
            value: manager.id,
          });
        }
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the employee's first name?",
              name: "firstName",
            },
            {
              type: "input",
              message: "What is the employee's last name?",
              name: "lastName",
            },
            {
              type: "list",
              message: "What is the employee's role?",
              choices: roles,
              name: "empRole",
            },
            {
              type: "list",
              message: "Who is the employee's manager?",
              choices: managers,
              name: "empManager",
            },
          ])
          .then((answers) => {
            // console.table(roles);
            // console.table(managers);
            db.query(
              `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}', '${answers.lastName}', ${answers.empRole}, ${answers.empManager})`,
              function (err, results) {
                if (err) throw err;
                console.log(
                  `Added ${answers.firstName} ${answers.lastName} to the database.`
                );
                viewEmployees();
              }
            );
          });
      }
    );
  });
}

function updateEmployee() {
  let roles = [];
  let employees = [];
  db.query("SELECT * FROM roles", function (err, results) {
    for (const role of results) {
      roles.push({
        name: role.title,
        value: role.id,
      });
    }
    db.query("SELECT * FROM employees", function (err, results) {
      for (const emp of results) {
        employees.push({
          name: emp.first_name + " " + emp.last_name,
          value: emp.id,
        });
      }
      inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee's role do you want to update?",
          choices: employees,
          name: "empName",
        },
        {
          type: "list",
          message: "What is the employee's new role?",
          choices: roles,
          name: "empRole",
        },
      ])
      .then((answers) => {
        db.query(
          `UPDATE employees SET role_id = ${answers.empRole} WHERE id = ${answers.empName}`,
          function (err, results) {
            if (err) throw err;
            console.log(
              `Updated ${answers.empName} to ${answers.empRole} in the database.`
            );
            viewEmployees();
          }
        );
      });
    });
  });
}
