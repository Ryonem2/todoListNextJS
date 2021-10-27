const express = require("express");
const cors = require("cors");
const mysqli = require("mysqli");

const app = express();

app.listen(8080, () => {
  console.log("server is running");
});
