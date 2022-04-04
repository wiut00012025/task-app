const express = require("express");
const router = express.Router();

const DbContext = require("../services/db-context");
const database = new DbContext();
database.useCollection("applications.json");

const isValidData = require("../utils/utils").isValidData;

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

router.get("/solved", (req, res) => {
    database.getSolved(
        (tasks) =>
            res.render(
                "all_tasks", {
                title: "List of All Solved Tasks",
                tasks: tasks
            }),
        () =>
            res.render("all_tasks", {
                title: "List of All Solved Tasks",
                tasks: null
            })
    );
});

router.get("/unsolved", (req, res) => {
    database.getUnsolved(
        (tasks) =>
            res.render(
                "all_tasks", {
                title: "List of All Unsolved Tasks",
                tasks: tasks
            }),
        () =>
            res.render("all_tasks", {
                title: "List of All Unsolved Tasks",
                tasks: null
            })
    );
});

router.get("/create", (req, res) => {
    res.render("create_task", { title: "New Application Form" });
});

router.post("/create", (req, res) => {
    if (isValidData(req.body)) {
        const date = new Date().toLocaleString();
        database.saveOne(req.body, date, () =>
            res.render("create_task", { success: true })
        );
    } else {
        res.render("create_task", { success: false });
    }
});

router.get("/changeStatus/:id", (req, res) => {
    id = req.params.id;
    database.changeStatus(id, () => res.redirect("/tasks/one/" + id)),
        () => res.sendStatus(500);
});

router.get("/delete/:id", (req, res) => {
    database.deleteOne(req.params.id, () => res.redirect("/tasks")),
        () => res.sendStatus(500);
});

router.get("/one/:id", (req, res) => {
    database.getOne(
        req.params.id,
        (task) =>
            res.render("single_task", { title: `${task.topic}`, task: task }),
        () => res.sendStatus(404)
    );
});


module.exports = router;
