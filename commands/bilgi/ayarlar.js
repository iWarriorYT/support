const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class UserInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ayarlar',
			aliases: [],
			group: 'bilgi',
			memberName: 'ayarlar',
			description: 'Responds with detailed information on a user.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS'],
		});
	}

	run(msg, { member }) {
		//veri
        const vt2 = this.client.provider.get(msg.guild.id, 'girisRol', []);
		const vt6 = this.client.provider.get(msg.guild.id, 'modlogChannel', []);
        //data
		const db1 = this.client.provider.get(msg.guild.id, 'girisRolK', []);
		const db2 = this.client.provider.get(msg.guild.id, 'modlogEnable', []);

		//<@&id>
		//<#id>

		const embed = new Discord.RichEmbed()
            .setTitle('Ayarlarınız ;')
			.addField('❯ Otorol Rolü', db1 ? `**Açık** (<@&${vt2}>)` : `**Kapalı** (h!otorol-ayarla)`)
			.addField('❯ Mod-Log Kanalı', db2 ? `**Açık** (<#${vt6}>)` : `**Kapalı** (h!modlog-ayarla)`)
		return msg.embed(embed);
	}
};