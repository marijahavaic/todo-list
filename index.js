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

// Get all tasks
app.get("/", (req, res) => {
    const tasks = JSON.parse(fs.readFileSync("db.json")).tasks;
    res.render("tasks", { tasks });
});

// Create new task
app.post("/tasks/create", (req, res) => {
    const tasks = JSON.parse(fs.readFileSync("db.json")).tasks;
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
    };
    tasks.push(newTask);
    fs.writeFileSync("db.json", JSON.stringify({ tasks }));
    res.redirect("/");
});

// Delete a task
app.get("/tasks/delete/:id", (req, res) => {
    const tasks = JSON.parse(fs.readFileSync("db.json")).tasks;
    const newTasks = tasks.filter(
        (task) => task.id !== parseInt(req.params.id)
    );
    fs.writeFileSync("db.json", JSON.stringify({ tasks: newTasks }));
    res.redirect("/");
});

// Listen on port 3000
app.listen(3000, () => console.log("Listening on the port 3000"));
