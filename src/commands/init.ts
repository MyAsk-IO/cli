import { Command, Args } from "@oclif/core";
import fs from "fs";
import path from "path";
import os from "os";
import chalk from "chalk";
import { loadConfig, saveConfig} from "../utils/config.js";

export default class Init extends Command {
  static description = "Initialize MyAsk CLI.";

  async run() {
    // Define paths
    const myaskDir = path.join(os.homedir(), ".myask");
    const config = loadConfig();

    // Ensure ~/.myask directory exists
    if (!fs.existsSync(myaskDir)) {
      fs.mkdirSync(myaskDir, { recursive: true });
      this.log(chalk.green(`✅ Created 'MyAsk' directory at ${myaskDir}`));
    }

    saveConfig({
      api: {
        host: config.api?.host || "https://myask.io",
        token: config.api?.token,
      }
    });

    this.log("✅ MyAsk CLI Initialized.");
  }
}