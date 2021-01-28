const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};

const token = 'ODA0MzQ4MTcwNjQwODE4MTk2.YBLBmw.oBe7GmbTjI8yzYUIHcr5tB1FMUQ';
bot.login(token);

bot.on('ready', () => {
    console.log('estou pronto para ser usado!');
});

bot.on('menssagem', msg => {
    if(msg.author.bot){
        return;
    }

    if(msg.content.toLowerCase().startsWith("?play")){
        let VoiceChannel = msg.guild.channel.find(channel => channel.id ===
         '804349004136972318');

         if (VoiceChannel === null){
             console.log('canal nao encontrado');
         }

         if(VoiceChannel != null){
            console.log('O canal foi encontrado');

            VoiceChannel.join()
            .then(connection => {
                const stream = ytdl('https://www.youtube.com/watch?v=s-9BOxMQFHs', 
                {filter:'audioonly'});

                const DJ = connection.playStream(stream, streamOptions);
                DJ.on('end', end => {
                    VoiceChannel.leave();
                })
            })
            .catch(console.error);
         }
    }
})