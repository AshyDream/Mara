const client = require('../handlers/client.js');
const { joinVoiceChannel } = require('@discordjs/voice');

let intervalId;

function rick(){
    const voiceChannels = client.channels.cache.filter(channel => channel.type === 2);
    const voiceConnections = new Map();
    voiceChannels.each(async channel => {
        const channelMembers = channel.members;
        if (channelMembers.size > 0) {
            const connection = voiceConnections.get(channel.id) ||
                joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator
                });
            voiceConnections.set(channel.id, connection);
            
            intervalId = setInterval(() =>{
                if (channelMembers.size <= 1) {
                    const connection = voiceConnections.get(channel.id);
                    if (connection) {
                        connection.destroy();
                        clearInterval(intervalId);
                    }
                }
            }, 5000);
        }
    });
};


module.exports = {
    name: 'rick',
    description: 'Never gonna give you up!',
    execute(){
                rick();
        }
    }




