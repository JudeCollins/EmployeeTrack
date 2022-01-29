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
  