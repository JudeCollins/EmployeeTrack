--initial database data

INSERT INTO department (name) VALUES ("IT"),("Marketing"),("HR");

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer",100000,1),
("Collaborator", 45000,2),
("Recruiter",60000,3);
