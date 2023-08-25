// Import Express
const express = require("express");
// Import JSON Server
const jsonServer = require("json-server");
// Import filesystem
const fs = require("fs");
// Import EJS
const bodyParser = require("body-parser");

// VARIABLES
const jsm = jsonServer.router("db.json");

// Start the app
const app = express();

// App Use and Set
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("./api", jsm);
app.set("view engine", "ejs");

// Listen on port 3000
app.listen(3000, () => console.log("Listening on the port 3000"));
