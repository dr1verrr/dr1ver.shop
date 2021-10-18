CREATE DATABASE products;

CREATE TABLE product (
  product_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);

CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   firstName VARCHAR(255) NOT NULL,
   lastName VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL UNIQUE,
   phonenumber VARCHAR(255) UNIQUE,
   password VARCHAR(255) NOT NULL
);
