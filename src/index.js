require("dotenv/config");
require("colors");

const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder }  = require("discord.js");
const { readdirSync } = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
  partials: [Partials.Channel, Partials.GuildMember],
  presence: {
    activities: [{name: `Give ⭐`, type: 0}],
    status: "online" }
});
client.commands = new Collection();
client.config = require("./config.js");

const handlerFolder = readdirSync("./src/handlers").filter((f) =>
  f.endsWith(".js")
);
for (const handler of handlerFolder) {
  const handlerFile = require(`./handlers/${handler}`);
  handlerFile(client);
}

// mention respond
client.on('messageCreate', async (message) => {
  if (message.author.bot) return false;

  if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return false;
  if (message.mentions.has(client.user.id)) {
    const embed = new EmbedBuilder()
    .setTitle(`Hello, I'm Moderation-Bot Template Did you ping me?`)
    .setDescription(`Need help? Try </help:1202269962148782141>\n\ `)
    .setColor(0xFFFFFF)
    .setFooter({text: "Made by Grezaski"})

    message.reply({ embeds: [embed] });
  }
});

client.login(process.env.Token);
