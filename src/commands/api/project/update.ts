import { Command } from '@oclif/core';
import axios from 'axios';
import inquirer from 'inquirer';
import { loadConfig } from '../../../utils/config.js';

export type ProjectType = {
    id?: string;
    name?: string;
    description?: string;
    ai_model?: string;
    system_message?: object;
};

export default class ProjectUpdate extends Command {
    static description = 'Update project information in MyAsk API';

    async run() {
        const { token: authToken, host: apiHost } = loadConfig().api;

        if (!authToken) {
            this.error('Missing MyAsk API token. Set it using `myask config -k YOUR_AUTH_TOKEN`.');
        }

        try {
            // Fetch projects to display a list for selection
            const response = await axios.get(`${apiHost}/api/projects`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });

            const projects = response.data;

            if (!projects || projects.length === 0) {
                this.log('No projects found.');
                return;
            }

            // Prompt the user to select a project to update
            const { selectedProject } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'selectedProject',
                    message: 'Select a project to update:',
                    choices: projects.sort((a: any, b: any) => (b.id - a.id)).map((project: ProjectType) => ({
                        name: `${project.id}: ${project.name}`,
                        value: project
                    })),
                    pageSize: 10
                }
            ]);

            // Prompt the user to edit project information
            const answers = await inquirer.prompt([
                { name: 'name', message: 'Project name:', type: 'input', default: selectedProject.name },
                { name: 'description', message: 'Project description:', type: 'input', default: selectedProject.description },
                { name: 'ai_model', message: 'Project AI Model:', type: 'input', default: selectedProject.ai_model },
                { name: 'system_message', message: 'Project system_message:', type: 'input', default: selectedProject.system_message.content }
            ]);

            const payload = {
                project: {
                    id: selectedProject.id,
                    name: answers.name,
                    description: answers.description,
                    ai_model: answers.ai_model,
                    system_message: { role: 'developer', content: answers.system_message }
                }
            };

            // Update the project information
            const updateResponse = await axios.patch(`${apiHost}/api/projects/${selectedProject.id}`, payload, {
                headers: { Authorization: `Bearer ${authToken}` }
            });

            this.log('Project updated successfully:', JSON.stringify(updateResponse.data, null, 2));
        } catch (error: any) {
            this.error(`Error updating project: ${error.message}`);
        }
    }
}