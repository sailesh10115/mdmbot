const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    let guilds = ""
    bot.guilds.forEach(guild => {
        guilds += `${guild.name} - ${guild.memberCount}\n`
    })
    message.channel.send(`${guilds}`)
}
//name this whatever the command name is. 
module.exports.help = {
    name: "servers"
}