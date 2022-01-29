-- delete the database if already exists
DROP DATABASE IF EXISTS employee_trackerDB;
-- Create database
CREATE database employee_trackerDB;

-- using  database
USE employee_trackerDB;

CREATE TABLE department (

id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
name VARCHAR(30) NOT NULL
 
);