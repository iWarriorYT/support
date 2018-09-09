const { Command } = require('discord.js-commando');

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'otorol-ayarla',
			aliases: ['girişrolüayarla', 'girişrolü', 'giriş-rolü', 'girisrolu', 'girisrol', 'girişrol', 'girisroluayarla'],
			group: 'ayarlar',
			memberName: 'otorol-ayarla',
			description: 'Giriş rolünü ayarlamınızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'rol',
					prompt: 'Giriş rolü hangi rol olsun? (rol ismini yazınız)\n',
					type: 'role',
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			const vt = this.client.provider.get(msg.guild.id, 'girisRol', []);
			const db = this.client.provider.get(msg.guild.id, 'girisRolK', []);
			
			if (vt === args.rol.id) {
				this.client.provider.set(msg.guild.id, 'girisRolK', true);
				msg.channel.send(` Giriş rolü zaten **${args.rol.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'girisRol', args.rol.id);
				this.client.provider.set(msg.guild.id, 'girisRolK', true);
				return msg.channel.send(` Giriş rolü olarak ayarlanan rol: **${args.rol.name}**`);
			}
	}
};