// Import Packages
const express = require("express");
const app = express();
const fs = require("fs");
const tasks = JSON.parse(fs.readFileSync("db.json")).tasks;

// ROUTES
// Get all tasks
app.get("/", (req, res) => {
    res.render("pages/tasks", { tasks });
});

// Create new task
app.post("/tasks/create", (req, res) => {
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

// Get a task by ID
app.get("/tasks/:id", (req, res) => {
    const task = tasks.find((task) => task.id === parseInt(req.params.id));
    res.render("pages/task", { task });
});

//TODO Update a task - doesn't work properly
app.patch("/tasks/update/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find((task) => task.id === id);
    const index = task.id;
    tasks.splice(index, 1);
    const updatedTasks = [
        {
            id: index,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
        },
        ...tasks,
    ];
    res.render("pages/updateTask", { task });
    fs.writeFileSync("db.json", JSON.stringify({ tasks: updatedTasks }));
    res.redirect("/");
});

// Delete a task
app.get("/tasks/delete/:id", (req, res) => {
    const newTasks = tasks.filter(
        (task) => task.id !== parseInt(req.params.id)
    );
    fs.writeFileSync("db.json", JSON.stringify({ tasks: newTasks }));
    res.redirect("/");
});

// Export router
module.exports = app;
