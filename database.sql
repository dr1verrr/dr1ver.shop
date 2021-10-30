create database products;

create table product (
  product_id serial primary key,
  product_name text not null,
  product_price decimal(4,2) NOT NULL,
  product_description varchar(255)
);

create table users (
   id serial primary key,
   user_type_id numeric default 2 not null,
   session_id UUID,
   firstname varchar(255) not null,
   lastname varchar(255) not null,
   email varchar(255) not null unique,
   phonenumber varchar(255) unique,
   password varchar(255) not null,
   createdAt timestamp
);
