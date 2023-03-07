const { EmbedBuilder } = require('discord.js');
const { unsplashAccessKey } = require('../config.json');

module.exports = {
  name: 'image',
  description: 'Give u random image from Unsplash with ur tags',
  async execute(message, args) {
    const query = args.join(' ');
    try {
      const fetch = await import('node-fetch');
      const json = await (await fetch.default(`https://api.unsplash.com/photos/random?client_id=${unsplashAccessKey}&query=${query}`)).json();
      const image = json.urls.regular;
      const embed = new EmbedBuilder()
        .setTitle(`Random image with tag: ${query}`)
        .setImage(image)
        .setTimestamp()
        .setFooter({ text: 'Provided by Unsplash' });
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply(`there was an error while searching for an image`);
    }
  },
};
