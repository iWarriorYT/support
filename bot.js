const { CommandoClient, FriendlyError, SQLiteProvider } = require('discord.js-commando');
const sqlite = require('sqlite');
const Discord = require('discord.js');
const MongoDBProvider = require('commando-provider-mongo');
const MongoClient = require('mongodb');
const moment = require('moment');
const path = require('path');
const winston = require('winston');
const { oneLine } = require('common-tags');


const client = new CommandoClient({
    commandPrefix: 'wf!',
    unknownCommandResponse: false,
    owner: '325260517256069121',
    disableEveryone: true
});

/*
//İstatistik
client.on('ready', async () => {
    let kanal = client.channels.find("id", "482944675507077131")
    let sunucu = client.guilds.find("id", "473097851640217600")
    
    const embed = new Discord.RichEmbed()
    .setTitle('Sunucu İstatistik')
    .setDescription(`Toplam Kullanıcı Sayısı: **${sunucu.members.size}**`)
    kanal.sendEmbed(embed).then(msg => {

        client.on('guildMemberAdd', async member => {
            embed.setDescription(`Kullanıcı Sayısı: **${sunucu.members.size}**`)
            msg.edit(embed)
            })
        client.on('guildMemberRemove', async member => {
            embed.setDescription(`Kullanıcı Sayısı: **${sunucu.members.size}**`)
            msg.edit(embed)
            })
        })
})
/*/


client.on("message", (message) => {
    if(message.author.bot) return;

    if(message.channel.id === "488346937234423818") {
        if (!message.content.startsWith("Öneri:")) {
            message.delete();
        } else {
            message.react("👍").then(c => {
                message.react("👎")
            });
        }
    } else {
        return;
    };
});


client.on("message", (message) => {
    if(message.author.bot) return;
  if(message.channel.id === "479608769152548866") {
    if (!message.guild.roles.exists("name", "Destek Ekibi")) return message.channel.send(`Bu Sunucuda '**Destek Ekibi**' rolünü bulamadım bu yüzden ticket açamıyorum \nEğer sunucu sahibisen, Destek Ekibi Rolünü oluşturabilirsin.`);
    if (message.guild.channels.exists("name", "destek-" + message.author.id)) { 
    message.delete();
    message.author.send(`Zaten açık durumda bir ticketin var.`)
        return;
    }
    message.guild.createChannel(`destek-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Destek Ekibi");
        let role3 = message.guild.roles.find("name", "Destek Lideri");
        let role4 = message.guild.roles.find("name", "Deneme Destek Ekibi");
        let role2 = message.guild.roles.find("name", "@everyone");
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
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: Ticket Kanalın Oluşturuldu, #${c.name}.`).then(msg => {msg.delete(3500)});
        const embed = new Discord.RichEmbed()
        .addField(`Hey ${message.author.username}!`, `Başarılı Bir Şekilde Ticketın Açıldı, Şimdi Destek Ekibini Beklemen Lazım.`)
        .addField('Konu', message.content)
        .setTimestamp();
        c.send('<@&473152215369121792>')
        c.send('<@&486478713303859231>')
        c.send({ embed: embed });
        message.delete();
    }).catch(console.error);
  }
})


client.on('error', winston.error)
	.on('warn', winston.warn)
	.on('ready', () => {
		winston.info(oneLine`
			[DISCORD]: Client ready...
			Logged in as ${client.user.tag} (${client.user.id})
		`);
    })
    .on('disconnect', () => winston.warn('[DISCORD]: Disconnected!'))
	.on('reconnect', () => winston.warn('[DISCORD]: Reconnecting...'))
	.on('commandRun', (cmd, promise, msg, args) =>
		winston.info(oneLine`
			[DISCORD]: ${msg.author.tag} (${msg.author.id})
			> ${msg.guild ? `${msg.guild.name} (${msg.guild.id})` : 'DM'}
			>> ${cmd.groupID}:${cmd.memberName}
			${Object.values(args).length ? `>>> ${Object.values(args)}` : ''}
		`)
	)
	.on('unknownCommand', msg => {
		if (msg.channel.type === 'dm') return;
		if (msg.author.bot) return;
		if (msg.content.split(msg.guild.commandPrefix)[1] === 'undefined') return;
		const args = { name: msg.content.split(msg.guild.commandPrefix)[1].toLowerCase() };
    })
    .on('commandError', (cmd, err) => {
		if (err instanceof FriendlyError) return;
		winston.error(`[DISCORD]: Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		winston.info(oneLine`
			[DISCORD]: Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; User ${msg.author.tag} (${msg.author.id}): ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		winston.info(oneLine`
			[DISCORD]: Prefix changed to ${prefix || 'the default'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		winston.info(oneLine`
			[DISCORD]: Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		winston.info(oneLine`
			[DISCORD]: Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})


client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['destek', 'Destek'],
        ['bilgi', 'Bilgi'],
        ['ayarlar', 'Ayarlar'],
        ['mod', 'Mod']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));
    sqlite.open(path.join(__dirname, "settings.sqlite3")).then((db) => {
        client.setProvider(new SQLiteProvider(db));
    });


    client.on('ready', () => {
        client.user.setGame("For iWarrior Family | wf!yardım", "https://www.twitch.tv/iwariorr");
    });



client.login(process.env.TOKEN);
