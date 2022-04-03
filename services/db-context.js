const fs = require("fs");
const path = require("path");

const generateID = require("../utils/utils").generateID;
const root = require("../utils/utils").root;

class DbContext {
  constructor() {
    this.collection = null;
  }

  useCollection(collection = "") {
    this.collection = path.join(root, `data/${collection}`);
  }

  getOne(id, successMsg, errorMsg) {
    fs.readFile(this.collection, "utf8", (err, data) => {
      if (err) errorMsg();

      const tasks = JSON.parse(data);
      const task = tasks.filter((task) => task.id == id)[0];
      successMsg(task);
    });
  }

  getUnsolved(successMsg, errorMsg) {
    fs.readFile(this.collection, "utf8", (err, data) => {
      if (err) errorMsg();

      const tasks = JSON.parse(data);
      const validTasks = tasks.filter((task) => task.solved != true);
      successMsg(validTasks);
    });
  }

  getSolved(successMsg, errorMsg) {
    fs.readFile(this.collection, "utf8", (err, data) => {
      if (err) errorMsg();

      const tasks = JSON.parse(data);
      const validTasks = tasks.filter((task) => task.solved == true);
      successMsg(validTasks);
    });
  }

  saveOne(newTask, date, successMsg, errorMsg) {
    fs.readFile(this.collection, "utf8", (err, data) => {
      if (err) errorMsg();

      const tasks = JSON.parse(data);

      tasks.push({
        id: generateID(),
        name: newTask.name,
        email: newTask.email,
        phoneNumber: newTask.phoneNumber,
        topic: newTask.topic,
        description: newTask.description,
        date: date,
        solved: false,
      });

      fs.writeFile(this.collection, JSON.stringify(tasks), (err) => {
        if (err) errorMsg();
        successMsg();
      });
    });
  }

  deleteOne(id, successMsg, errorMsg) {
    fs.readFile(this.collection, "utf8", (err, data) => {
      if (err) errorMsg();

      const tasks = JSON.parse(data);

      const filtered = tasks.filter((task) => task.id != id) || [];

      fs.writeFile(this.collection, JSON.stringify(filtered), (err) => {
        if (err) errorMsg();
        successMsg();
      });
    });
  }
}

module.exports = DbContext;
