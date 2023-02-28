const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const client = require('./client.js');
client.commands = new Discord.Collection();

const folderPath = path.resolve('./Commands');
const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(folderPath +'/'+ file);
	client.commands.set(command.name, command);
}
console.log(client.commands);

module.exports = client.commands;
