const {token, prefix} = require('./config.json');
const Discord = require('discord.js');
const client = require('./handlers/client.js');

client.commands = require('./handlers/commandsAdder.js');
client.slashCommands = require('./handlers/slashCommandsAdder.js');

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

client.on('ready', (client) => {
    console.log('Bot - online: ' + client.user.tag);
});

client.login(token);