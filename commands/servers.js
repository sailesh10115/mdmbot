const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    let guilds = ""
    bot.guilds.cache.forEach(async guild => {
/*        let channel = guild.channels.cache.filter(c=>c.type === "text" && c.permissionsFor(guild.me) && c.permissionsFor(guild.me).has("CREATE_INVITE")).random();
        let invite = "Nope!"
        if(channel) invite = `discord.gg/${(await channel.createInvite()).code}` */
        let log = `${guild.name} - ${guild.id} - ${guild.memberCount}`
        guilds += `${log}\n`
    })
    message.channel.send(`${guilds}`).catch(e=>console.log(e.message))
    console.log(`${guilds}`)

}
//name this whatever the command name is. 
module.exports.help = {
    name: "servers"
}
