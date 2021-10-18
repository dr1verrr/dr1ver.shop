CREATE DATABASE products;

CREATE TABLE product (
  product_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);

CREATE TABLE users (
   id SERIAL NOT NULL,
   firstName VARCHAR(30) NOT NULL,
   lastName VARCHAR(30) NOT NULL,
   email VARCHAR(30) NOT NULL,
   password VARCHAR(30) NOT NULL
);
