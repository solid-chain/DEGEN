import { DMChannel, User } from 'discord.js';
import { DiscordUserCollection } from '../../../types/discord/DiscordUserCollection';
import { MessageSelectOptionData } from 'discord.js';
import { DEGENMenuInteraction } from '../../../types/interactions/DEGENMenuInteraction';
import Log from '../../Log';
import { sendMenuInteraction } from '../../interactionBuilders/sendMenuInteraction';
import { getChain } from 'evm-chains';

export const changePOAPAddressInteraction = (user: User, dmChannel:DMChannel, discordUserDocument: DiscordUserCollection): Promise<DEGENMenuInteraction> => {

	const { connectedAddresses } = discordUserDocument;

	Log.debug('changePOAPAddressInteraction started');
	const menuItems: MessageSelectOptionData[] = connectedAddresses.map((address, i) => {
		return {
			label: `${getChain(parseInt(address.chainId)).name}`,
			description: `ChainId: ${address.chainId}, Address: ${address.address}`,
			value: i.toString(),
		};
	});

	const interaction: DEGENMenuInteraction = {
		prompt: 'Select the address you want to be live.',
		menuOptions: menuItems,
		functionToCall: 'updatePOAPAddress',
	};

	return sendMenuInteraction(interaction, dmChannel, user, discordUserDocument);
};