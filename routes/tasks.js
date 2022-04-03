const express = require("express");
const router = express.Router();

const DbContext = require("../services/db-context");
const database = new DbContext();
database.useCollection("applications.json");

router.get("/", (req, res) => {
    database.getAll(
        (tasks) =>
            res.render(
                "all_tasks", {
                title: "List of All Tasks",
                tasks: tasks
            }),
        () =>
            res.render("all_tasks", {
                title: "List of All Tasks",
                tasks: null
            })
    );
});

router.get("/:id", (req, res) => {
    database.getOne(
        req.params.id,
        (task) =>
            res.render("single_task", { title: `${task.topic}`, task: task }),
        () => res.sendStatus(404)
    );
});

module.exports = router;
