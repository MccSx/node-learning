const api = require("./index");

const { program } = require("commander");

program.option("-d, --debug", "output extra debugging");
program
  .command("add")
  .description("add a task")
  .action((...args) => {
    args[1] && api.add(args[1].join(" "));
  });
program
  .command("clear")
  .description("clear all task")
  .action((source, destination) => {
    // console.log(source);
  });

program.parse(process.argv);
