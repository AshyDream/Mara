const fs = require('fs');
const Discord = require('discord.js');
const {BOT_TOKEN} = require('./config.json');
const {DEFAULT_PREFIX} = require('./config.json');
const Client = require('./handlers/client.js');

Client.on('ready', (client) => {
    console.log('Bot - online: ' + client.user.tag);
});

Client.login(BOT_TOKEN);