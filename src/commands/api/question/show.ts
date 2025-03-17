import { Command, Flags, Args } from '@oclif/core';
import axios, { AxiosError } from "axios";
import inquirer from 'inquirer';
import { loadConfig } from "../../../utils/config.js";
import { formatCodeBlocks } from "../../../utils/codeFormatter.js";
import chalk from "chalk";

export default class Question extends Command {
	static description = 'Show details for MyAsk question';

	static args = {
		questionId: Args.string({ description: "ID of question to display" }),
	};

	static flags = {
		list: Flags.boolean({ description: 'List questions and select to view' }),
		questionId: Flags.string({ char: "q", description: 'ID of question to display' }),
		skipResponse: Flags.boolean({ char: "s", description: 'Do not include question response in output' }),
	};

	async run() {
		const { args, flags } = await this.parse(Question);
		const { token: authToken, host: apiHost } = loadConfig().api;

		if (!authToken) {
			this.error("Missing MyAsk API token. Set it using `myask config -k YOUR_AUTH_TOKEN`.");
		}

		if (args.questionId && flags.questionId) {
			this.error("Supplied both flag and argument. Only use one.")
		}

		let response;
		let selectedquestion;

		try {
			if (flags.list) {
				response = await axios.get(`${apiHost}/api/questions`, {
					headers: { Authorization: `Bearer ${authToken}` }
				})

				const questions = response.data?.reverse();

				if (!questions || questions.length === 0) {
					this.log("No questions found.");
					return;
				}

				// Prompt the user to select a project
				selectedquestion = await inquirer.prompt([
					{
						type: 'list',
						name: 'id',
						message: 'Select a question:',
						choices: questions.map((question: { id: string; content: string }) => ({
							name: `[${question.id}] ${question.content.substring(0, 80)}`,
							value: question.id
						})),
						pageSize: 10
					}
				]);
			}

			response = await axios.get(`${apiHost}/api/questions/${selectedquestion?.id || flags.questionId || args.questionId}`, {
				headers: { Authorization: `Bearer ${authToken}` }
			});

			this.log(chalk.whiteBright(`\n${"\\".repeat(30)} BEGIN Question (${response.data?.question?.id}): ${"/".repeat(30)}\n`))
			this.log(chalk.cyan(formatCodeBlocks(response.data?.question?.content)));
			this.log(chalk.whiteBright(`\n${"\\".repeat(35)} END Question ${"/".repeat(35)}\n`))

			if (!flags.skipResponse || response.data?.response?.data === null) {
				this.log(chalk.whiteBright(`\n\n${"\\".repeat(30)} BEGIN Response (${response.data?.response?.id}): ${"/".repeat(30)}\n`))
				this.log(chalk.cyan(formatCodeBlocks(response.data?.response?.content)));
				this.log(chalk.whiteBright(`\n${"\\".repeat(35)} END Response ${"/".repeat(35)}\n`))
			}
		} catch (error: any) {
		    if (axios.isAxiosError(error)) {
		      console.error(chalk.red(`❌ API request failed: ${error.response?.status} - ${error.response?.statusText}`));
		    } else {
		      console.error(chalk.red(`❌ Unexpected error occurred: ${error}`));
		    }
		}

		return;
	}
}