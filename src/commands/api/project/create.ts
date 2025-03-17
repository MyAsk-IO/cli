import { Command, Flags } from '@oclif/core';
import axios from 'axios';
import inquirer from 'inquirer';
import { loadConfig } from "../../../utils/config.js";

export default class ProjectCreate extends Command {
	static description = 'Create new project in MyAsk API';

	static flags = {
		name: Flags.string({ description: 'Project name' }),
		description: Flags.string({ description: 'Project description' })
	};

	async run() {
		const { flags } = await this.parse(ProjectCreate);
		const { token: authToken, host: apiHost } = loadConfig().api;

		if (!authToken) {
			this.error("Missing MyAsk API token. Set it using `myask config -k YOUR_AUTH_TOKEN`.");
		}

        const ai_models = ["gpt-4o-mini", "o3-mini", "o1-mini", "gpt-3.5-turbo", "gpt-4o", "chatgpt-4o-latest"];
        const answers = await inquirer.prompt([
            { name: 'name', message: 'Enter project name:', type: 'input' },
            { name: 'description', message: 'Enter project description:', type: 'input' },
            {
                name: 'ai_model',
                type: 'list',
                message: 'Select an AI model for this project:',
                choices: ai_models.map((model) => ({ name: model, value: model })),
                pageSize: 10
            },
            { name: 'system_message', message: 'Enter project system_message (optional):', type: 'input' }
        ]);
        const payload = {
            project: {
                name: answers.name,
                description: answers.description,
                ai_model: answers.ai_model,
                system_message: { role: "developer", content: answers.system_message }
            }
        };

		const response = await axios.post(`${apiHost}/api/projects`, payload, {
			headers: { Authorization: `Bearer ${authToken}` }
		});
		this.log('Project created successfully:', JSON.stringify(response.data, null, 2));
	}
}