const inquirer = require("inquirer");
const db = require("./db.js");

function getAllTasks(list) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "index",
        message: "请选择你要操作的任务",
        choices: [
          ...list.map((item, index) => {
            return {
              name: `[${item.done ? "√" : "-"}] ${index + 1} ${item.title}`,
              value: index.toString()
            };
          }),
          { name: "+ 创建任务", value: "-2" },
          { name: "退出", value: "-1" }
        ]
      }
    ])
    .then(answers => {
      const index = parseInt(answers.index);
      if (index >= 0) {
        // 选择的任务
        choicesAction(list, index);
      } else if (index === -2) {
        // 选择创建任务
        addNewTask(list);
      }
    });
}

function choicesAction(list, index) {
  const actions = { isFinished, unFinished, updateTitle, deleteTask };
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "请选择你要的操作",
        choices: [
          { name: "退出", value: "quit" },
          { name: "已完成", value: "isFinished" },
          { name: "未完成", value: "unFinished" },
          { name: "改标题", value: "updateTitle" },
          { name: "删除", value: "deleteTask" }
        ]
      }
    ])
    .then(answers => {
      const action = actions[answers.action];
      action && action(list, index);
    });
}

function addNewTask(list) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "task_name",
        message: "输入你的任务名称"
      }
    ])
    .then(answers => {
      list.push({ title: answers.task_name, done: false });
      db.write(list);
    });
}

function isFinished(list, index) {
  list[index].done = true;
  db.write(list);
}

function unFinished(list, index) {
  list[index].done = false;
  db.write(list);
}

function updateTitle(list, index) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "new_task_name",
        message: "输入新的任务名称"
      }
    ])
    .then(async answers => {
      list[index].title = answers.new_task_name;
      db.write(list);
    });
}

function deleteTask(list, index) {
  list.splice(index, 1);
  db.write(list);
}

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
  getAllTasks(list);
};
