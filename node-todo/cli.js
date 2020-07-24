const api = require("./index");

const { program } = require("commander");

program
  .command("add")
  .description("add a task")
  .action((...args) => {
    args[1] && api.add(args[1].join(" "));
  });
program
  .command("clear")
  .description("clear all task")
  .action((...args) => {
    api.clear();
  });

program
  .command("all")
  .description("show all task")
  .action((...args) => {
    api.showAll();
  });

program.parse(process.argv);
