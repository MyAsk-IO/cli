import { Command, Args } from '@oclif/core';
import axios from 'axios';
import inquirer from 'inquirer';
import { loadConfig } from "../../../utils/config.js";

export default class Invitation extends Command {
	static description = 'Send MyAsk invitation to a new user.';

	static args = {
		email: Args.string({ description: "Email of the user to invite to MyAsk" }),
	};

	async run() {
		const { args } = await this.parse(Invitation);
		const { token: authToken, host: apiHost } = loadConfig().api;

		if (!authToken) {
			this.error("Missing MyAsk API token. Set it using `myask config -k YOUR_AUTH_TOKEN`.");
		}

		let answers;
		if (!args.email) {
			answers = await inquirer.prompt([{ name: 'email', message: 'Enter invitee email:', type: 'input' }]);
		}

		const payload = {
			invitation: {
				email: args.email || answers?.email
			},
		};

		const response = await axios.post(`${apiHost}/api/invitations`, payload, {
			headers: { Authorization: `Bearer ${authToken}` }
		});
		this.log('Invitation sent successfully:', JSON.stringify(response.data, null, 2));
	}
}