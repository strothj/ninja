import chalk from "chalk";
import commander from "commander";
import packageJson from "../package.json";
import header from "./header";

import removeComments from "./commands/remove-comments";

let commandExecuted = false;

console.log(header);

commander
  .version(packageJson.version)
  .command("remove-comments <filename>")
  .action((filename: string) => {
    executeCommand("remove-comments", () => removeComments(filename));
  });

commander.parse(process.argv);

if (!commandExecuted) {
  commander.outputHelp(text => chalk.red(text));
  console.log();
}

function executeCommand(name: string, command: () => any) {
  commandExecuted = true;
  command();
  console.log(chalk.green(`Executed command "${name}" successfully.\n`));
}
