const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction, Client } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("membercount")
      .setDescription("Get the server member count."),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     * @returns
     */
    async execute(interaction, client) {
      const { config } = client;
      const { embedColor } = config;
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(embedColor)
            .setTimestamp()
            .addFields({
              name: "Members",
              value: `${interaction.guild.memberCount}`,
            }),
        ],
      });
    },
  };