var mysql = require("mysql");
var inquirer = require("inquirer");

//connect to sql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDB",
  });

  //  start application
connection.connect(function (err) {
    if (err) throw err;
  
    questions();
  });
  
  function questions() {
    inquirer
      .prompt({
        type: "list",
        name: "action",
        message: "Choose below.",
        choices: [
          "View All Employees",
          "View All Employees by Department",
          "View All Employees by Role",
          "Create a Department",
          "Create a Role",
          "Add an Employee",
          
          "Update Employee Role",
          
          "Exit",
        ],
      })
      .then(function (answer) {
        switch (answer.action) {
          case "View All Employees":
            viewAll();
            break;
  
          case "View All Employees by Department":
            viewAllDepartment();
            break;
  
          case "View All Employees by Role":
            viewAllRole();
            break;
  
          case "Create a Department":
            createDep();
            break;
          case "Create a Role":
            createRole();
            break;
          case "Add an Employee":
            addEmployee();
            break;
          
          case "Update Employee Role":
            updateEmployee();
            break;
          
  
          case "Exit":
            connection.end();
            break;
        }
      });
  }

  //  all employees
function viewAll() {
    connection.query(
      `SELECT employee.first_name, employee.last_name, role.salary, role.title, department.name as "Department Name"
      FROM employee_trackerDB.employee
      INNER JOIN role ON employee.role_id = role.id
      INNER JOIN department ON role.department_id = department.id`,
  
      function (err, res) {
        if (err) throw err;
  
        console.table(res);
        questions();
      }
    );
  }
   //by department
  function viewAllDepartment() {
    connection.query(
      "SELECT department.name FROM employee_trackerDB.department",
      function (err, res) {
        if (err) throw err;
  
        inquirer
          .prompt([
            {
              name: "choice",
              type: "list",
              choices: function () {
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                  choiceArray.push(res[i].name);
                }
                return choiceArray;
              },
              message: "Which Department?",
            },
          ])
          .then(function (answer) {
            console.log(answer);
            console.log(answer.choice);
  
            connection.query(
              `SELECT employee.first_name, employee.last_name, role.salary, role.title, department.name as "Department Name"
        FROM employee_trackerDB.employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        WHERE department.name LIKE "${answer.choice}"`,
              function (err, res) {
                if (err) throw err;
  
                console.table(res);
                questions();
              }
            );
          });
      }
    );
  }
  //by role
  function viewAllRole() {
    connection.query("SELECT role.title FROM employee_trackerDB.role", function (
      err,
      res
    ) {
      if (err) throw err;
  
      inquirer
        .prompt([
          {
            name: "choice",
            type: "list",
            choices: function () {
              var choiceArray = [];
              for (var i = 0; i < res.length; i++) {
                choiceArray.push(res[i].title);
              }
              return choiceArray;
            },
            message: "Which Role?",
          },
        ])
        .then(function (answer) {
          console.log(answer);
          console.log(answer.choice);
  
          connection.query(
            `SELECT employee.first_name, employee.last_name, role.salary, role.title, department.name as "Department Name"
          FROM employee_trackerDB.employee
          INNER JOIN role ON employee.role_id = role.id
          INNER JOIN department ON role.department_id = department.id
          WHERE role.title LIKE "${answer.choice}"`,
            function (err, res) {
              if (err) throw err;
  
              console.table(res);
              questions();
            }
          );
        });
    });
  }
 //creating department
  function createDep() {
    
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "What is the department name?",
        },
      ])
      .then(function (answer) {
        
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: answer.name,
          },
          function (err) {
            if (err) throw err;
            console.log(`You have created a department ${answer.name}.`)
            questions();
          }
        );
      });
  }

  //role created
  function createRole() {
    connection.query(
      "SELECT department.name, department.id FROM employee_trackerDB.department",
      function (err, res) {
        if (err) throw err;
  
        inquirer
          .prompt([
            {
              name: "choice",
              type: "list",
              choices: function () {
                var choiceArray = [];
                var choiceArrayID = [];
                for (var i = 0; i < res.length; i++) {
                  choiceArray.push(res[i].name);
                  choiceArrayID.push(res[i].id);
                }
                return choiceArray;
              },
              message: "Which Department?",
            },
            {
              name: "title",
              type: "input",
              message: "What is the role name?",
            },
            {
              name: "salary",
              type: "input",
              message: "What is the salary?",
            },
          ])
          .then(function (answer) {
            var department_id = answer.choice;
  
            for (var i = 0; i < res.length; i++) {
              if (res[i].name === answer.choice) {
                department_id = res[i].id;
                console.log(department_id);
              }
            }
  
            connection.query(
              "INSERT INTO role SET ?",
              {
                title: answer.title,
                salary: answer.salary,
                department_id: department_id,
              },
              function (err) {
                if (err) throw err;
  
                console.log(`You have created ${answer.title} with salary of ${answer.salary} in ${department_id}.`)
  
                questions();
              }
            );
          });
      }
    );
  }
  
  
  
 