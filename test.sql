DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
USE testdb;

DROP TABLE IF EXISTS user;

CREATE TABLE user(
	uid INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
	uname VARCHAR(120),
	upass VARCHAR(120)
);

DROP TABLE IF EXISTS addr;
CREATE TABLE addr(
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	uid INTEGER,
	addr CHAR(120)
);

DELIMITER $$

CREATE PROCEDURE one_query_proc()
BEGIN
	select uid,uname,upass from user;
END$$

CREATE PROCEDURE two_query_proc()
BEGIN
	select * from user;
	select * from addr;
END$$

CREATE PROCEDURE one_insert_proc()
BEGIN
	declare u float;
	set u=rand();
	insert into user(uname,upass) values(u,u);
END$$

CREATE PROCEDURE two_insert_proc()
BEGIN
	declare u float;
	set u=rand();
	insert into user(uname,upass) values(u,u);
	set u=rand();
	insert into user(uname,upass) values(u,u);
END$$
CREATE PROCEDURE insert_and_query_proc()
BEGIN
	declare u float;
	set u=rand();
	insert into user(uname,upass) values(u,u);
	select * from user;
END$$

INSERT INTO user(uname,upass) VALUES('a','a');
INSERT INTO user(uname,upass) VALUES('b','b');
INSERT INTO user(uname,upass) VALUES('c','c');
INSERT INTO user(uname,upass) VALUES('d','d');

INSERT INTO addr(uid,addr) values(1,'beijing');
INSERT INTO addr(uid,addr) values(2,'shadong');
INSERT INTO addr(uid,addr) values(3,'shanghai');
