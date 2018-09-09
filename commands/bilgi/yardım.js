const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class ServerInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'yardım',
			aliases: ['y'],
			group: 'bilgi',
			memberName: 'yardım',
			description: 'Bütün Komutları Gösterir.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS']
		});
	}

	async run(msg) {
		if (!msg.guild.members.has(msg.guild.ownerID)) await msg.guild.members.fetch(msg.guild.ownerID);
		const embed = new Discord.RichEmbed()
			.addField('❯ Destek Komutları', `wf!**kapat** | Destek kanallarını kapatır.\nwf!**destekaç** | Destek kanalı açarsınız.`)
			.addField('❯ Bilgi Komutları', `wf!**yardım** | Komutları gösterir.`)
			.addField('❯ Moderator Komutları', `wf!**mute** | Kullanıcı susturursunuz.\nwf!**oylama** | Oylama yaparsınız.\nwf!**sil** | Mesaj Silersiniz.`)
			.addField('❯ Ayar Komutları', `wf!**modlog-ayarla** | Modlog kanalını ayarlarsınız.\nwf!**modlog-kapat** | Modlog sistemini devre dışı bırakır.\nwf!**otorol-ayarla** | Otorol ayarlarsınız.\nwf!**otorol-kapat** | Otorol sistemini kapatırsınız.`)
		return msg.embed(embed);
	}
};