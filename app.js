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