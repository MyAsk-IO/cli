import { Command, Flags, Args } from '@oclif/core';
import axios from 'axios';
import inquirer from 'inquirer';
import { loadConfig } from "../../../utils/config.js";
import chalk from "chalk";

export default class ProjectShow extends Command {
	static description = 'Show information for MyAsk project';

	static args = {
		projectId: Args.string({ description: "ID of project to display" }),
	};

	static flags = {
		list: Flags.boolean({ description: 'List projects and select to view' }),
		projectId: Flags.string({ char: 'p', description: 'ID of project to display' }),
	};

	async run() {
		const { args, flags } = await this.parse(ProjectShow);
		const { token: authToken, host: apiHost } = loadConfig().api;

		if (!authToken) {
			this.error("Missing MyAsk API token. Set it using `myask config -k YOUR_AUTH_TOKEN`.");
		}

		if (args.projectId && flags.projectId) {
			this.error("Supplied both flag and argument. Only use one.")
			return;
		}

		let response;
		let selectedproject;

		try {
			if (flags.list) {
				response = await axios.get(`${apiHost}/api/projects`, {
					headers: { Authorization: `Bearer ${authToken}` }
				})

				const projects = response.data?.reverse();

				if (!projects || projects.length === 0) {
					this.log("No projects found.");
					return;
				}

				// Prompt the user to select a project
				selectedproject = await inquirer.prompt([
					{
						type: 'list',
						name: 'id',
						message: 'Select a project:',
						choices: projects.map((project: { id: string; name: string }) => ({
							name: project.name.substring(0, 80),
							value: project.id
						})),
						pageSize: 10
					}
				]);
			}

			response = await axios.get(`${apiHost}/api/projects/${selectedproject?.id || flags.projectId || args.projectId}`, {
				headers: { Authorization: `Bearer ${authToken}` }
			});

			this.log(
				chalk.cyan(
					JSON.stringify(
						Object.assign(response.data?.project, { question_ids: response.data?.question_ids.reverse() }), null, 2
					)
				)
			);

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