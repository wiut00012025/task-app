const PORT = 8000;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// serving static files
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// setting template engine to pug
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { title: "Welcome to Blog App!" });
});

// listening for requests
const listener = app.listen(PORT, () => {
  console.log(`App is listening on port  http://localhost:${PORT}`);
});
