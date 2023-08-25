// Import Packages
const express = require("express");
const jsonServer = require("json-server");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./routes/router");

// Middelware and tasks array
const jsm = jsonServer.router("db.json");

// Server Express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("./api", jsm);
app.set("view engine", "ejs");
app.use(router);
app.use("/images", express.static("images"));

// Listen on port 3000
app.listen(3000, () => console.log("Listening on the port 3000"));
