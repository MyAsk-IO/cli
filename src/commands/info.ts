import { Command } from "@oclif/core";
import path from "path";
import os from "os";
import chalk from "chalk";

export default class Info extends Command {
  static description = "Display current project and configuration information.";

  async run() {
    const myaskDir = path.join(os.homedir(), ".myask");

    const configFilePath = path.join(myaskDir, "config.json");
    const executablePath = process.execPath;

    this.log(chalk.bold(`\n📍 MyAsk CLI Information`));

    // Display the directory storing configuration files
    this.log(chalk.cyan(`\n📂 Config Directory: ${myaskDir}`));

    // Display the MyAsk executable path
    this.log(chalk.magenta(`\n🏃 MyAsk Executable Path: ${executablePath}\n`));
  }
}
