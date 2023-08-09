const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const {router} = require("./routes");
const db = require("./db/connection");
const path = require("path");
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(express.static(path.join(__dirname, "../public")));

app.listen(5000, () => {
  console.log("Server started http://localhost:5000");
});
