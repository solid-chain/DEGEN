import constants from '../service/constants/constants';
// import { GuildMember, Message } from 'discord.js';

const isInteger = (value: any): boolean => {
	return /^\d+$/.test(value);
};

const ScoapUtils = {

	validateTotalNumberOfRoles(message_content: string): boolean {
		return (isInteger(message_content) && (parseInt(message_content) < 10) && (parseInt(message_content) >= 1));
	},

	validateTotalNumberOfPeoplePerRole(message_content: string): boolean {
		return (isInteger(message_content) && (parseInt(message_content) < 1000) && (parseInt(message_content) >= 1));
	},

	validateSummary(summary: string): boolean {
		const CREATE_SUMMARY_REGEX = /^[\w\s.!@#$%&,?']{1,4000}$/;
		return (!(summary == null || !CREATE_SUMMARY_REGEX.test(summary)));
	},

	validateReward(message_content: string): boolean {
		const [reward, symbol] = (message_content != null) ? message_content.split(' ') : [null, null];
		const amount = parseInt(reward);
		const ALLOWED_CURRENCIES = ['ETH', 'BANK'];
		const MAXIMUM_REWARD = 100000000;
		return (!(isNaN(amount) || amount <= 0 || amount > MAXIMUM_REWARD
					|| !ALLOWED_CURRENCIES.includes(symbol)));
	},

	validateTitle(title: string): boolean {
		const CREATE_TITLE_REGEX = /^[\w\s.!@#$%&,?']{1,250}$/;
		return (!(title == null || !CREATE_TITLE_REGEX.test(title)));
	},

	getKeyByValue(object: any, value: string): any {
		return Object.keys(object).find(key => object[key] === value);
	},

	purgeExpiredBotConvo(bot_convo_state) {
		if (Object.keys(bot_convo_state).length === 0 && bot_convo_state.constructor === Object) {
			// console.log('NO CONVO');
			return;
		}
		// console.log('BOT CONVO STATE ', bot_convo_state);
		
		for (const key of Object.keys(bot_convo_state)) {
		    const dtnow = +new Date();
			const dtold = bot_convo_state[key].getTimeout();
			const deltat = dtnow - dtold;
			if (deltat > constants.BOT_CONVERSATION_TIMEOUT_MS) {
				console.log('BOT CONVO TIMED OUT, DELTA T = ', deltat);
				bot_convo_state[key].getCurrentChannel().send('Conversation timed out. please try again.');
				delete bot_convo_state[bot_convo_state[key].getUserId()];
			}
		}
		// for (const botConvo of bot_convo_state) {
		// 	console.log('BOT CONVO ', botConvo);
		// 	const dtnow = +new Date();
		// 	const dtold = botConvo.getTimeout();
		// 	const deltat = dtnow - dtold;
		// 	console.log(dtnow);
		// 	console.log(dtold);
		// 	console.log(deltat);
		// 	// if (deltat > constants.BOT_CONVERSATION_TIMEOUT_MS) {
		// 	// 	console.log('BOT CONVO TIMED OUT, DELTA T = ', (dtnow - botConvo.getTimeout()));
		// 	// 	// delete botConvoState[botConvo.getUserId()];
		// 	// }
		// }
		return;
	},
};

export default ScoapUtils;

