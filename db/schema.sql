DROP DATABASE IF EXISTS mealTime_db;

CREATE DATABASE mealTime_db;

USE mealTime_db;

CREATE TABLE userProfiles(
    id INT(30) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    userName VARCHAR(255) NOT NULL,
    passWord VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL
);

CREATE TABLE orders(
    id INT(30) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    restaurant VARCHAR(255),
    orders VARCHAR(255) NOT NULL,
    total FLOAT(30,2) NOT NULL,
    orderDate DATE NOT NULL
);

