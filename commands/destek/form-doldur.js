const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'form-doldur',
            group: 'destek',
            memberName: 'form-doldur',
            description: 'Formu doldur.',
            examples: ['formu-doldur'],
            args: [{
                key: 'ad',
                prompt: 'Adın ne?',
                type: 'string',
              },
              {
                key: 'soyad',
                prompt: 'Soyadın ne?',
                type: 'string',
              },
              {
                key: 'yas',
                prompt: 'Yaşın kaç?',
                type: 'string',
              },
              {
                key: 'deneyimlerin',
                prompt: 'Deneyimlerin neler?',
                type: 'string',
              },
              {
                key: 'kendinianlat',
                prompt: 'Kendini bize anlat.',
                type: 'string',
              },
              {
                key: 'discordbilgin',
                prompt: 'Discord bilgin ne kadar?',
                type: 'string',
              },
              {
                key: 'aktifligin',
                prompt: 'Aktifliğin ne kadar?',
                type: 'string',
              },
              {
                key: 'uyarikick',
                prompt: 'Hiç uyarı kick aldın mı?',
                type: 'string',
              },
              {
                key: 'sorumluluksahibi',
                prompt: 'Sorumluluk sahibi bir insan mısın?',
                type: 'string',
              },
              {
                key: 'ekiblecalisma',
                prompt: 'Ekible çalışma yeteneklerine sahip misin?',
                type: 'string',
              },
              {
                key: 'nedenbiz',
                prompt: 'Neden biz?',
                type: 'string',
              },
              {
                key: 'kadro',
                prompt: 'Hangi kadroya girmek istiyorsun? (Destek Ekibi, Görevli, Reklamcı)',
                type: 'string',
                validate: string => {
                    if (string === 'Reklamcı' || string === 'reklamcı' || string === 'Destek Ekibi' || string === 'destek ekibi' || string === 'Görevli'|| string === 'görevli') return true;
                    else return 'Lütfen `Reklamcı` ve ya `Görevli` ve ya `Destek Ekibi` yazınız.';
                }
              }
            ]
        });
    }

    run(msg, args) {
        let channel = msg.guild.channels.find('id', "488343608601214977")

        msg.channel.send(':white_check_mark: Başarıyla Form Yollandı. İyi Günler.');

        const embed = new Discord.RichEmbed()
        .setTitle('**Yeni Form Geldi**')
        .addField('Discord Ad', `${msg.author.tag}`)
        .addField('Ad', `${args.ad}`)
        .addField('Soyad', `${args.soyad}`)
        .addField('Yaş', `${args.yas}`)
        .addField('Deneyimler', `${args.deneyimlerin}`)
        .addField('Kendini Anlatım', `${args.kendinianlat}`)
        .addField('Discord Bilgi', `${args.discordbilgin}`)
        .addField('Aktifliği', `${args.aktifligin}`)
        .addField('Uyarı Kick Aldımı', `${args.uyarikick}`)
        .addField('Sorumluluk Sahibimi', `${args.sorumluluksahibi}`)
        .addField('Ekible Çalışma Yetenekleri', `${args.ekiblecalisma}`)
        .addField('Neden Biz', `${args.nedenbiz}`)
        .addField('Kadro', `${args.kadro}`)
        channel.sendEmbed(embed);
    }
};