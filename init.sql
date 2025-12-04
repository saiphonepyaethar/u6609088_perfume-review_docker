CREATE DATABASE IF NOT EXISTS perfume_db;

USE perfume_db;

CREATE TABLE perfume_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  brand VARCHAR(255),
  rating INT,
  review TEXT
);

INSERT INTO perfume_reviews (name, brand, rating, review) VALUES
('Layton', 'Parfums de Marly', 5, 'Warm spicy vanilla.'),
('T-Rex', 'Zoologist', 4, 'Smoky and powerful.'),
('Sauvage', 'Dior', 4, 'Fresh and modern.');
