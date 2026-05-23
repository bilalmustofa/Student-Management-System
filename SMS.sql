CREATE TABLE IF NOT EXISTS students (
id int AUTO_INCREMENT,
full_name varchar(255) NOT NULL,
email varchar(255) NOT NULL,
phone varchar(20) NOT NULL,
department varchar(255) NOT NULL,
address varchar(500) NOT NULL,
gender varchar(20) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id)
);