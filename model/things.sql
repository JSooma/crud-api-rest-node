CREATE DATABASE things;

USE things;

CREATE TABLE things (--Entidad things.
	thing_id INT UNSIGNED AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	PRIMARY KEY(thing_id)
);
