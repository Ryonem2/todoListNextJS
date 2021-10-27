const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_username,
  password: process.env.DB_password,
  database: process.env.DB_DATABASE,
});

conn.connect((err) => {
  if (!!err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

app.use(cors());
app.use(express.json());

app.post("/insertdata", (req, res) => {
  const name = req.body.listContent;
//   const comment = req.body.;
  const comment = req.body.comment;
  console.log(name);
  console.log(comment);
  conn.query(
    `INSERT INTO data (Name,Comment) VALUES ('${name}','${comment}')`,
    (err, result) => {
      err ? console.log(err) : console.log("inserted");
    }
  );
});

app.get("/showdata", (req, res) => {
  conn.query("SELECT * FROM data", (err, result) => {
    err ? console.log(err) : res.send(result);
  });
});

app.listen("8080", () => {
  console.log("server is running");
});
