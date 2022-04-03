const DbContext = require("./services/db-context");
const database = new DbContext();
database.useCollection("applications.json");
const PORT = 8000;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// routes
const tasks = require("./routes/tasks");

// serving static files
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// setting template engine to pug
app.set("view engine", "pug");

app.use("/tasks", tasks);

app.get("/", (req, res) => {
    res.render("index", { title: "Welcome to Blog App!" });
});

app.get("/api/v1/tasks", (req, res) => {
    database.getJsonFile(req, res);
});

// listening for requests
const listener = app.listen(PORT, () => {
    console.log(`App is listening on port  http://localhost:${PORT}`);
});
