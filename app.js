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
          // "Delete Employee",
          "Update Employee Role",
          // "Update Employee Manager",
          "Exit",
        ],
      })
    