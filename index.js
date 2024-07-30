const express = require("express");
const { Pool } = require("pg");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  database: "movies_db",
  port: 5434,
});

pool.connect();

app.get("/api/movies", (req, res) => {
  pool.query("SELECT * FROM  movies", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "something went wrong", err });
    } else {
      res.json(data.rows);
    }
  });
});

app.get("/api/movie-reviews", (req, res) => {
  pool.query(
    `SELECT movie_name,review 
    FROM movies 
    JOIN reviews 
    ON movies.id = movie_id`,
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "something went wrong", err });
      } else {
        res.json(data.rows);
      }
    }
  );
});

app.post("/api/new-movie", (req, res) => {
  pool.query(
    "INSERT INTO movies (movie_name) VALUES($1)",
    [req.body.movie_name],
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "something went wrong", err });
      } else {
        res.json({ msg: "data added!" });
      }
    }
  );
});

app.delete("/api/movie/:id", (req, res) => {
  pool.query("DELETE FROM movies WHERE id=$1", [req.params.id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "something went wrong", err });
    } else {
      console.log(data);
      res.json({ msg: "movie deleted!" });
    }
  });
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
