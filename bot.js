const Discord = require("discord.js");
const client = new Discord.Client();

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

var prefix = "!";

client.on("ready", () => {
  console.log("Bot Giriş Yaptı Şu Kadar Sunucuya Hizmet veriyorum:" + client.guilds.size);
  client.user.setGame(`Made For iWarrior Fmly | ${prefix}yardım`, "https://www.twitch.tv/iwarriorr");
});

client.on("message", (message) => {
    if(message.author.bot) return;
  if(message.channel.id === "479608769152548866") {
    if (!message.guild.roles.exists("name", "[ Destek Ekibi ]")) return message.channel.send(`Bu Sunucuda '**Destek Ekibi**' rolünü bulamadım bu yüzden ticket açamıyorum \nEğer sunucu sahibisen, Destek Ekibi Rolünü oluşturabilirsin.`);
    if (message.guild.channels.exists("name", "destek-" + message.author.id)) return message.author.send(`Zaten açık durumda bir ticketin var.`)
    message.delete();
    message.guild.createChannel(`destek-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "[ Destek Ekibi ]");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
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
        c.send({ embed: embed });
        message.delete();
    }).catch(console.error);
  }
})

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(prefix + `yardım`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`:mailbox_with_mail: Support Bot`)
    .setDescription(`Komutlarım Şunlar`)
    .addField(`Ticket`, `[${prefix}ticket]() > Destek Bildirimi Oluşturur!\n[${prefix}kapat]() > Ticket Kapatır!`)
    .addField(`Diğer`, `[${prefix}yardım]() > Yardım Menüsünü Gösterir.\n[${prefix}ping]() > Discord API Ping Değerini Gösterir.`)
    message.channel.send({ embed: embed });
  }

  if (message.content.toLowerCase().startsWith(prefix + `ping`)) {
    message.channel.send(`İŞTE GELİYOR!`).then(m => {
    m.edit(`:ping_pong: Wow, Bu Çok Hızlıydı. **Pong!**\nMesaj Editleme zamanım ` + (m.createdTimestamp - message.createdTimestamp) + `ms, Discord API pingim ` + Math.round(client.ping) + `ms.`);
    });
}

if (message.content.toLowerCase() === `${prefix}ticket`) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "[ Destek Ekibi ]")) return message.channel.send(`Bu Sunucuda '**Destek Ekibi**' rolünü bulamadım bu yüzden ticket açamıyorum \nEğer sunucu sahibisen, Destek Ekibi Rolünü oluşturabilirsin.`);
    if (message.guild.channels.exists("name", "destek-" + message.author.id)) return message.author.send(`Zaten açık durumda bir ticketin var.`)
    message.delete();
    message.guild.createChannel(`destek-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "[ Destek Ekibi ]");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: Ticket Kanalın Oluşturuldu, #${c.name}.`).then(msg => {msg.delete(3500)});
        const embed = new Discord.RichEmbed()
        .addField(`Hey ${message.author.username}!`, `Başarılı Bir Şekilde Ticket Açıldı, Şimdi Destek Ekibini Beklemelisin.`)
        .addField(`Konu`, reason ? reason : 'Konu Verilmemiş')
        .setTimestamp();
        c.send('<@&473152215369121792>')
        c.send({ embed: embed });
        message.delete();
    }).catch(console.error);
}
if (message.content.toLowerCase() === `${prefix}kapat`) {
    if (!message.channel.name.startsWith(`destek-`)) return message.channel.send(`Bu komutu kullanamazsın ticket kanalında olman gerekir. Bu bot opensource bir projedir. http://github.com/arpelo`);
    
    message.channel.send(`Kanalı Kapatmaya Emin misin? Emin isen **-kapat** Yazman Yeterli.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '-kapat', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Ticket Kapatma İsteğin Zaman Aşımına Uğradı.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}


});

client.login(process.env.TOKEN);
