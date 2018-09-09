const { Command } = require('discord.js-commando');

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'modlog-ayarla',
			aliases: [],
			group: 'ayarlar',
			memberName: 'modlog-ayarla',
			description: 'Mod-Log kanalını değiştirmenizi sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'channel',
					prompt: 'Mod-Log kanalı hangi kanal olsun? (#kanalismi şeklinde yazınız)\n',
					type: 'channel'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
		var ch = await args.channel;
		if (ch.type == 'voice') return msg.reply('Sesli kanallar seçilemez!');
        if (args.channel) {
			const vt = this.client.provider.get(msg.guild.id, 'modlogChannel', []);
			const db = this.client.provider.get(msg.guild.id, 'modlogEnable', []);
			if (vt === args.channel.id) {
				this.client.provider.set(msg.guild.id, 'modlogEnable', true);
				msg.channel.send(`Mod-Log kanalı zaten **${args.channel.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'modlogChannel', args.channel.id);
				this.client.provider.set(msg.guild.id, 'modlogEnable', true);
				return msg.channel.send(`Mod-Log olarak ayarlanan kanal: **${args.channel.name}**`);
			}
        }
    }
};