const { Player } = require('discord-player');
const client = require('../handlers/client');
const { joinVoiceChannel } = require('@discordjs/voice');

const player = new Player(client);

async function rick(){
    const voiceChannels = client.channels.cache.filter(channel => channel.type === 2);
    const voiceConnections = new Map();
    voiceChannels.each(async (channel) => {
        const channelMembers = channel.members;
        if (channelMembers.size > 0) {
            const connection = voiceConnections.get(channel.id) ||
                joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator
                });
            voiceConnections.set(channel.id, connection);
            player.play(channel, 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=71429be76fbb4a3e');
        };
    });
};

module.exports = {
    name: 'rick',
    description: 'Never gonna give u up!',
    execute(){
        rick();
    }
}