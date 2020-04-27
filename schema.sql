DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10) NOT NULL,
  stock_quantity INT (10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Iphone","Electronics",500,99);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Macbook","Electronics",899,100);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Xbox","Electronics",299,25);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Oil Filter","Auto Parts",7.99,18);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Flashlight","Tools",14.79,300);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Sweatshirt","Apparel",27.85,40);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("VHS Player","Electronics",90,3);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Textbook","Books",250,999);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("novel","Books",7.99,35);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Jeans","Apparel",60,50);