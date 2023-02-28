const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const client = require('./client');

client.slashCommands = new Discord.Collection();
const folderPath = path.resolve('./SlashCommands');
const SlashCommandsFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

for (const file of SlashCommandsFiles) {
    const slashCommand = require(folderPath + '/' + file);
    client.slashCommands.set(slashCommand.data.name, slashCommand);
}
console.log(client.slashCommands);

client.on(Discord.Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.slashCommands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

module.exports = client.slashCommands;