\c postgres;
DROP DATABASE IF EXISTS movies_db;
CREATE DATABASE movies_db;

\c movies_db;

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    movie_name VARCHAR(200) NOT NULL
);
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    movie_id INT NOT NULL,
    review TEXT NOT NULL,
    FOREIGN KEY (movie_id) 
    REFERENCES movies(id)
    ON DELETE CASCADE
);