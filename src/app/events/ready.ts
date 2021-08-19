/**
 * Handler for Discord event `ready`.
 */

import GuestPassService from '../service/guest-pass/GuestPassService';
import { Client } from 'discord.js';

module.exports = {
	name: 'ready',
	once: true,

	async execute(client: Client) {
		console.log('Discord bot ready!');
		client.user.setActivity('Going Bankless, Doing the DAO');
		await GuestPassService(client);
	},
};