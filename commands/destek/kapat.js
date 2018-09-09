const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kapat',
            group: 'destek',
            memberName: 'kapat',
            description: 'Destek kanallarını kapatmaya yarar.',
            examples: ['kapat'],
            args: [
                {
                    key: 'yanit',
                    prompt: 'Emin misin? Kapatılsın mı? (evet veya hayır olarak cevap yazınız)',
                    type: 'string',
                    validate: string => {
						if (string === 'evet' || string === 'hayır') return true;
						else return 'Lütfen `evet` ya da `hayır` yazınız';
					}
                }
            ]
        });
    }

    run(msg, args) {
        if (!msg.channel.name.startsWith(`destek-`)) return msg.channel.send(`Bu komutu sadece destek kanallarında kullanabilirsin.`);
        if (args.yanit === "evet") {
            msg.channel.delete();
        }
        if (args.yanit === "hayır") return;
    }
};