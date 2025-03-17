import { Command, Flags, Args } from '@oclif/core';
import axios from 'axios';
import inquirer from 'inquirer';
import { loadConfig } from "../../../utils/config.js";
import chalk from "chalk";

export default class QuestionDelete extends Command {
	static description = 'Delete MyAsk question';

	static args = {
		questionId: Args.string({ description: "ID of question to delete" }),
	};

	static flags = {
		list: Flags.boolean({ description: 'List questions and select to delete' }),
		questionId: Flags.string({ char: 'p', description: 'ID of question to delete' }),
	};

	async run() {
		const { args, flags } = await this.parse(QuestionDelete);
		const { token: authToken, host: apiHost } = loadConfig().api;

		if (!authToken) {
			this.error("Missing MyAsk API token. Set it using `myask config -k YOUR_AUTH_TOKEN`.");
		}

		if (args.questionId && flags.questionId) {
			this.error("Supplied both flag and argument. Only use one.")
			return;
		}

		let response;
		let selectedQuestion;

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

				// Prompt the user to select a question
				selectedQuestion = await inquirer.prompt([
					{
						type: 'list',
						name: 'id',
						message: 'Select a question:',
						choices: questions.map((question: { id: string; content: string }) => ({
							name: question.content.substring(0, 80),
							value: question.id
						})),
						pageSize: 10
					}
				]);
			}

			response = await axios.delete(`${apiHost}/api/questions/${selectedQuestion?.id || flags.questionId || args.questionId}`, {
				headers: { Authorization: `Bearer ${authToken}` }
			});

			this.log(chalk.cyan(JSON.stringify(response.data?.question, null, 2)));

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