const { Client, Intents } = require('discord.js');
const cron = require("cron");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const keepAlive = require("./server")

const TOKEN = process.env['TOKEN']
const GUILD_ID = process.env['guild_id']

client.once("ready", () => {
  console.log(`Online as ${client.user.tag}`);

  let scheduledMessage = new cron.CronJob('05 20 7 * * *', () => {
    console.log('4i20')
    const guild = client.guilds.cache.get(GUILD_ID);
    const channel = guild.channels.cache.get('622576008876392450');
    channel.send('4i20');
  });

  scheduledMessage.start()
});



client.on("messageCreate", msg => {
  if(msg.author.bot === true) return
  console.log(msg)

  if (msg.content === "ping") {
    msg.reply("pong")
  }

  if(msg.content[0] === '&') {
    console.log("comando &")
  } else if (msg.content.slice(0, 7) === "pantufo") {
    console.log("comando pantufo")
  }
})

client.on("messageDelete", msg => {
  if(msg.content.includes("deletada")) {

  } else {
    msg.channel.send(`A mensagem de ${msg.author.username}: '${msg.content}' foi deletada`)
  }
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

keepAlive()

client.login(TOKEN);