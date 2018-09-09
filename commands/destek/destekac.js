const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'destekac',
            aliases: ['destekaç'],
            group: 'destek',
            memberName: 'destekac',
            description: 'Destek kanalı açmanıza yarar.',
            examples: ['destekac Destek lazım'],
            args: [
                {
                    key: 'konu',
                    prompt: 'Sorunun ne?',
                    type: 'string',
                }
            ]
        });
    }

    run(msg, args) {
        if (msg.guild.channels.exists("name", "destek-" + msg.author.id)) { 
            msg.delete();
            msg.author.send(`Zaten açık durumda bir ticketin var.`)
                return;
            }

        if(msg.guild.id === "473097851640217600") {
            msg.guild.createChannel(`destek-${msg.author.id}`, "text").then(c => {
                let role = msg.guild.roles.find("name", "Destek Ekibi");
                let role3 = msg.guild.roles.find("name", "Destek Lideri");
                let role4 = msg.guild.roles.find("name", "Deneme Destek Ekibi");
                let role2 = msg.guild.roles.find("name", "@everyone");
                c.overwritePermissions(role, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true
                });
                c.overwritePermissions(role2, {
                    SEND_MESSAGES: false,
                    READ_MESSAGES: false
                });
                 c.overwritePermissions(role4, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true
                });
                c.overwritePermissions(role3, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true
                });
                c.overwritePermissions(msg.author, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true
                });
                msg.channel.send(`:white_check_mark: Ticket Kanalın Oluşturuldu, #${c.name}.`).then(msg => {msg.delete(3500)});
                const embed = new Discord.RichEmbed()
                .addField(`Hey ${msg.author.username}!`, `Başarılı Bir Şekilde Ticketın Açıldı, Şimdi Destek Ekibini Beklemen Lazım.`)
                .addField('Kullanıcı', msg.author.tag)
                .addField('Konu', args.konu)
                .setTimestamp();
                c.send('<@&473152215369121792>')
                c.send('<@&486478713303859231>')
                c.send({ embed: embed });
                msg.delete();
            }).catch(console.error);    
        }
    }
};