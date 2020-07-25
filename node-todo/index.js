const inquirer = require("inquirer");
const db = require("./db.js");

module.exports.add = async name => {
  const list = await db.read();
  list.push({ title: name, done: false });
  await db.write(list);
};

module.exports.clear = async () => {
  await db.write([]);
};

module.exports.showAll = async () => {
  const list = await db.read();
  inquirer
    .prompt([
      {
        type: "list",
        name: "index",
        message: "请选择你要操作的任务",
        choices: [
          { name: "退出", value: "-1" },
          ...list.map((item, index) => {
            return {
              name: `[${item.done ? "√" : "-"}] ${index + 1} ${item.title}`,
              value: index.toString()
            };
          })
        ]
      }
    ])
    .then(answers => {
      console.log(JSON.stringify(answers));
    });
};
