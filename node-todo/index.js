const homedir = require("os").homedir();
const home = process.env.HOME || homedir;
const p = require("path");
const fs = require("fs");
const path = p.join(home, ".todo");

module.exports.add = name => {
  fs.readFile(path, { flag: "a+" }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      let list;
      try {
        list = JSON.parse(data.toString());
      } catch (err) {
        list = [];
      }
      const task = {
        title: name,
        done: false
      };
      list.push(task);
      fs.writeFile(path, JSON.stringify(list), error2 => {
        error2 && console.log(error2);
      });
    }
  });
};
