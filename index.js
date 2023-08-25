// Import Express
const express = require("express");
// Import JSON Server
const jsonServer = require("json-server");
// Import filesystem
const fs = require("fs");
// Import EJS
const bodyParser = require("body-parser");
// Start the app
const app = express();
// Listen on port 3000
app.listen(3000, () => console.log("Listening on the port 3000"));
