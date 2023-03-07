const { SlashCommandBuilder } = require('discord.js');
const {unsplashAccessKey} = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('image')
        .setDescription('Give u random unsplash image with ur tags')
        .addStringOption(option => {
            return option
            .setName('tags')
            .setDescription('The tags to use for search')
        }),
    async execute(interaction) {
        const tags = interaction.option.getString('tags')
        if(!tags.size){
            try{
                const fetch = await import('node-fetch');
                const json = await (await fetch.default(`https://api.unsplash.com/photos/random?client_id=${unsplashAccessKey}`)).json();
                const image = json.urls.regular;
                await interaction.reply({
                    content: 'Random image',
                    embeds: [{
                        image: { url: image },
                        footer: { text: 'Provided by Unsplash'},
                        timestamp: new Date(),
                    }],
                });
            } catch(error) {
                console.error(error);
                await interaction.reply('There was an error while looking for image');
            };
        } else {
            try{
                const fetch = await import('node-fetch');
                const json = await (await fetch.default(`https://api.unsplash.com/photos/random?client_id=${unsplashAccessKey}&query=${tags}`)).json();
                const image = json.urls.regular;
                await interaction.reply({
                    content: `Random image with tag: ${tags}`,
                    embeds: [{
                        image: { url: image },
                        footer: { text: 'Provided by Unsplash'},
                        timestamp: new Date(),
                    }],
                });
            } catch(error){
                console.error(error);
                await interaction.reply(`There was an error while looking for image with tag: ${tags}`);
            };
        };
    },
};