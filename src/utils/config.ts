import fs from "fs";
import os from "os";
import path from "path";

const CONFIG_FILE = path.join(os.homedir(), ".myask", "config.json");

export type ConfigData = {
  api?: {
    host?: string;
    token?: string;
  },
  project?: {
    id?: string;
    name?: string;
    description?: string;
    ai_model?: string;
    system_message?: object;
  };
};

/**
 * Load existing config or return an empty object.
 */
export function loadConfig(): Record<string, any> {
  if (!fs.existsSync(CONFIG_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
  } catch {
    return {};
  }
}

/**
 * Save configuration
 */
export function saveConfig(newConfig: Record<string, any>) {
  const config = { ...loadConfig(), ...newConfig };
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}
