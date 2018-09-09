const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const winston = require('winston');
const Discord = require('discord.js');

module.exports = class ClearCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sil',
            aliases: ['clean', 'delete'],
            group: 'mod',
            memberName: 'sil',
            description: 'Kanalınızdaki mesajları siler.',
            details: 'Bir sayı ile o kadar mesaj silin.',
            examples: [`${client.commandPrefix}sil 10`],
            guildOnly: true,
            clientPermissions: ['MANAGE_MESSAGES', 'SEND_MESSAGES', 'EMBED_LINKS'],
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'limit',
                    prompt: 'Ne kadar mesajın silinmesini istiyorsun?',
                    type: 'integer'
                }
            ]
        });
    }

    async run(msg, { limit }) {
        let modlog = this.client.provider.get(msg.guild.id, 'modlogChannel', []);
        if(limit > 100) return msg.channel.send('100\'den Büyük Sayı Giremezsin!')
        if(limit < 1) return msg.channel.send('1\'den Küçük Sayı Giremezsin!')
        msg.channel.bulkDelete(limit);

        const resultEmbed = new Discord.RichEmbed()
            .setColor('#00ff1d')
            .setTitle('Başarılı!')
            .addField('Yetkili', msg.author.tag)
            .addField('Silinen Mesaj Sayısı', limit)
        
        msg.channel.send(resultEmbed).then(msg => msg.delete({ timeout: 5 }));

        const embed = new Discord.RichEmbed()
          .setTitle(':bangbang: **Yetkili Eylem** :scales:')
          .setAuthor(`${msg.author.tag} (${msg.author.id})`, `${msg.author.avatarURL}`)
          .setColor('RANDOM')
          .setDescription(`**Eylem:** Mesaj Silme \n**Kanal:** ${msg.channel.name}\n**Mesaj Sayısı:** ${limit}`)
          .setTimestamp()
          msg.guild.channels.get(modlog).sendEmbed(embed);
    }
}
