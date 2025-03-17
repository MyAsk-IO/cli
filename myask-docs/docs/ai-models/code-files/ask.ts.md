# Source Code

## Example code from "@claire-ac/cli"

### - <a href="https://github.com/CLaiRE-AC/CLaiRE/blob/v0.0.6/src/commands/ask.ts" target="_blank">ask.ts on Github</a>

Source code file for construction AI prompts for the <a href="https://claire.ac/" target="_blank">CLaiRE API</a>

```typescript
  import { Command, Flags } from "@oclif/core";
  import axios, { AxiosError } from "axios";
  import inquirer from "inquirer";
  import cliSpinners from "cli-spinners"; // Animated status indicator
  import ora from "ora"; // Loading spinner
  import { loadConfig } from "../utils/config.js";
  import { formatCodeBlocks } from "../utils/codeFormatter.js";

  export default class Ask extends Command {
    static description = "Send a prompt to CLaiRE API and retrieve a response.";

    static flags = {
      prompt: Flags.string({ char: "p", description: "Prompt to send" }),
      inputFile: Flags.string({ char: "F", description: "Path to file(s) containing the question input", multiple: true }),
      contextIds: Flags.string({ char: "c", description: "Comma-separated list of context IDs", multiple: true }),
    };

    static examples = [
      '<%= config.bin %> <%= command.id %> -p "How do I add ActiveAdmin to a Rails 7 app?"',
      '<%= config.bin %> <%= command.id %> -p "Refactor this file" -F path/to/src/file.ts',
      '<%= config.bin %> <%= command.id %> -F path/to/input.txt',
      '<%= config.bin %> <%= command.id %> -p "Help me combine these files:" -F path/to/file1.ts -F path/to/file2.ts',
      '<%= config.bin %> <%= command.id %> -p "Analyze this code" -c 123 -c 456',
    ];

    async run() {
      const { flags } = await this.parse(Ask);
      const { token: authToken, host: apiHost } = loadConfig().api;
      const { id: projectId } = loadConfig().project;

      if (!authToken) {
        this.error("Missing CLaiRE API token. Set it using `claire config -k YOUR_AUTH_TOKEN`.");
      }

      if (!projectId) {
        this.error("CLaiRE Project Not Set. Set it using `claire api:project:set`.");
      }

      let content = await this.getInitialQuestion(flags);
      let contextIds: number[] = this.parseContextIds(flags.contextIds);

      while (true) {
        try {
          const questionId = await this.submitQuestion(apiHost, authToken, projectId, content, contextIds);
          if (!questionId) return;

          contextIds.push(questionId); // Append new question ID to context

          const response = await this.pollForResponse(apiHost, authToken, questionId);

          this.log("\n💡 CLaiRE API Response:");
          this.log(formatCodeBlocks(response));

          const { isFollowUp } = await inquirer.prompt([
            { type: "confirm", name: "isFollowUp", message: "Would you like to ask a follow-up question?", default: false },
          ]);

          if (!isFollowUp) break;

          const { followUpQuestion } = await inquirer.prompt([
            { type: "input", name: "followUpQuestion", message: "Enter your follow-up question:" },
          ]);

          content = followUpQuestion.trim();
        } catch (error) {
          this.error(`${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
    }

    private async submitQuestion(apiHost: string, authToken: string, projectId: number, content: string, contextIds: number[]): Promise<number | null> {
      try {
        const response = await axios.post(
          `${apiHost}/api/questions`,
          { question: { project_id: projectId, content, context_ids: contextIds } },
          { headers: { Authorization: `Bearer ${authToken}`, "Content-Type": "application/json" } }
        );

        return response.data?.id || null;
      } catch (error) {
        const errorMessage = this.extractErrorMessage(error);
        this.error(`❌ ${errorMessage}`);
        return null;
      }
    }

    private async pollForResponse(apiHost: string, authToken: string, questionId: number): Promise<string> {
      const spinner = ora({ text: "🔄 Waiting for response from CLaiRE API...", spinner: cliSpinners.dots }).start();
      const maxRetries = 50;
      let attempt = 0;

      while (attempt < maxRetries) {
        try {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          const response = await axios.get(`${apiHost}/api/responses/${questionId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });

          if (response.data?.content) {
            spinner.succeed("✅ Response received!");
            return response.data.content;
          }
        } catch (error: any) {
          const errorMessage = this.extractErrorMessage(error);

          if (error.response?.data?.errors?.includes("Response doesn't exist")) {
            spinner.text = `⏳ Still waiting for CLaiRE API response... [Attempt: ${attempt + 1}/10]`;
          } else {
            spinner.fail(`❌ Error fetching response: ${errorMessage}`);
            throw new Error(errorMessage);
          }
        }

        attempt++;
      }

      spinner.fail("❌ Timed out waiting for CLaiRE API response.");
      throw new Error("No response received from CLaiRE API after multiple attempts.");
    }

    private extractErrorMessage(error: unknown): string {
      if (axios.isAxiosError(error)) {
        return error.response?.data?.messages || error.response?.data?.error || error.message || "Unknown API error";
      }
      return error instanceof Error ? error.message : "An unknown error occurred";
    }

    private async getInitialQuestion(flags: any): Promise<string> {
      let prompt = flags.prompt ? flags.prompt.trim() : "";
      let fileContents = [];

      if (flags.inputFile && flags.inputFile.length > 0) {
        const fs = await import("fs/promises");

        for (const filePath of flags.inputFile) {
          try {
            const content = (await fs.readFile(filePath, "utf-8")).trim();
            fileContents.push(`📄 **File: ${filePath}**\n${content}`);
          } catch (error) {
            this.error(`❌ Failed to read input file: ${filePath}`);
          }
        }
      }

      let combinedQuestion = prompt;

      if (fileContents.length > 0) {
        combinedQuestion += `\n\n---\n${fileContents.join("\n\n---\n")}`;
      }

      if (combinedQuestion.trim()) return combinedQuestion;

      const { userPrompt } = await inquirer.prompt([
        { type: "input", name: "userPrompt", message: "Please enter a prompt:" },
      ]);

      return userPrompt.trim();
    }

    private parseContextIds(contextIds: string[] | undefined): number[] {
      if (!contextIds || contextIds.length === 0) return [];

      try {
        return contextIds.flatMap(id => id.split(",")).map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
      } catch {
        this.error("❌ Invalid context IDs provided. Please ensure they are numbers.");
        return [];
      }
    }
  }
```