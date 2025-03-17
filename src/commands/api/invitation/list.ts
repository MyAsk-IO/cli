import { Command, Flags } from '@oclif/core';
import axios from 'axios';
import { loadConfig } from "../../../utils/config.js";

export default class Invitation extends Command {
	static description = 'Show sent MyAsk invitations.';

	async run() {
		const { token: authToken, host: apiHost } = loadConfig().api;

		if (!authToken) {
			this.error("Missing MyAsk API token. Set it using `myask config -k YOUR_AUTH_TOKEN`.");
		}

		const response = await axios.get(`${apiHost}/api/invitations`, {
			headers: { Authorization: `Bearer ${authToken}` }
		});
		this.log(JSON.stringify(response.data, null, 2));
		return;
	}
}