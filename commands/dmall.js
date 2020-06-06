const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    let prefix = "!";;
    if (!message.content.startsWith(prefix)) return;


    await message.channel.send(`Whats the guild ID`)
    let answer = await message.channel.awaitMessages(answer => answer.author.id != bot.user.id, { max: 1 });
    const guilddm = (answer.map(answers => answers.content).join());

    await message.channel.send(`Delay per person (in seconds)`)
    answer = await message.channel.awaitMessages(answer => answer.author.id != bot.user.id, { max: 1 });
    const timedm = (answer.map(answers => answers.content).join());

    message.channel.send(`What do you want the message to be`)
    answer = await message.channel.awaitMessages(answer => answer.author.id != bot.user.id, { max: 1 });
    const messagedm = (answer.map(answers => answers.content).join());

/*         let guilddm = args[0];
         console.log(guilddm)
        if (!guilddm) {
          message.channel.send('guild?')
            return
        }
    
        let timedm = args[1];
        console.log(timedm)
        if (!timedm) {
          message.channel.send('time?')
            return
        }
    
        let messagedm = args[2];
        console.log(messagedm)
        if (!messagedm) {
          message.channel.send('message?')
            return
        } */


    let dmGuild = bot.guilds.cache.get(`${guilddm}`)
    var msg = messagedm;

    let memberarray = dmGuild.members.cache.array();
    let membercount = memberarray.length;
    let botcount = 0;
    let successcount = 0;
    console.log(`Responding to ${message.author.username} :  Sending message to all ${membercount} members of ${dmGuild.name}.`)
    message.author.send(`Responding to ${message.author.username} :  Sending message to all ${membercount} members of ${dmGuild.name}.`)
    for (var i = 0; i < membercount; i++) {
        let member = memberarray[i];
        if (member.user.bot) {
            console.log(`Skipping bot with name ${member.user.username}`)
            botcount++;
            continue
        }
        if (member.user.bot) {
            console.log(`Skipping bot with name ${member.user.username}`)
            continue
        }
        /*
                if (member.roles.some(r => ["Community Figure", "Developer", "Content Creator"].includes(r.name))) {
                    console.log(`Skipping role with name ${member.user.username}`);
                    continue
                } */

        let timeout = Math.floor((Math.random() * (timedm - 0.01)) * 1000) + 10;

        await sleep(timeout);
        if (i == (membercount - 1)) {
            console.log(`Waited ${timeout}ms.\t\\/\tDMing ${member.user.username}`);
        } else {
            console.log(`Waited ${timeout}ms.\t|${i + 1}|\tDMing ${member.user.username}`);
        }
        try {
            member.send(`${msg} \n #${timeout}`);
            successcount++;
        } catch (error) {
            console.log(`Failed to send DM! ` + error)
        }
    }

    console.log(`Sent ${successcount} ${(successcount != 1 ? `messages` : `message`)} successfully, ` +
        `${botcount} ${(botcount != 1 ? `bots were` : `bot was`)} skipped.`);
    message.author.send(`Sent ${successcount} ${(successcount != 1 ? `messages` : `message`)} successfully, ` +
        `${botcount} ${(botcount != 1 ? `bots were` : `bot was`)} skipped.`)


}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//name this whatever the command name is.
module.exports.help = {
    name: "dmall"
}