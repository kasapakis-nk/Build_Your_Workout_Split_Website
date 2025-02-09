CREATE DATABASE IF NOT EXISTS SplitOrganizerDB;
USE SplitOrganizerDB;

CREATE TABLE IF NOT EXISTS exercises_list (
    ex_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO exercises_list (name)
VALUES 
    ('Barbell Bench Press'),
    ('Bent-Over Rows'),
    ('Pull-Ups'),
    ('Assisted Pull-Ups (Band)'),
    ('Zercher Squats');
