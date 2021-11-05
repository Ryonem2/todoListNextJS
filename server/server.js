const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

// const conn = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_username,
//   password: process.env.DB_password,
//   database: process.env.DB_DATABASE,
// });

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "datatest",
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
  const data = req.body.listContent;
  const date = req.body.date;
  const key = req.body.key;
  conn.query(
    `INSERT INTO todolist (listcontent,isimportant,date,keyforli) VALUES ('${data}',TRUE,'${date}','${key}')`,
    (err, result) => {
      err ? console.log(err) : console.log("inserted " + data);
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id);
  conn.query(
    `DELETE FROM todolist WHERE id = ${id}`,
    (err, { serverStatus }) => {
      err
        ? console.log(err)
        : console.log(`Deleted id = ${id} Status ${serverStatus}`);
    }
  );
  res.send("hello");
});

app.get("/showdata", (req, res) => {
  conn.query("SELECT * FROM todoList", (err, result) => {
    err ? console.log(err) : res.send(result);
  });
});

app.listen("8080", () => {
  console.log("server is running");
});
