CREATE DATABASE products;

CREATE TABLE product (
  product_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);

CREATE TABLE users (
   id SERIAL NOT NULL,
   username VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL
);

