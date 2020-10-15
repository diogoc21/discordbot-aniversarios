const { config } = require("dotenv");
const fs = require("fs")
const ytdl = require("ytdl-core")

const { Client, RichEmbed } = new require("discord.js");

const client = new Client({
    disableEveryone: true
})

config({
    path: __dirname + "/.env"
})

client.on("ready", () => {
    console.log("I'm online!")

    client.user.setPresence({
        status: "online",
        game: "Tás a olhar para onde seu burro?",
        type: "WATCHING"
    })
    aniversarios();
    setInterval(aniversarios, 3600000);

})

function dc() {
    client.voice.connections.first().disconnect();
}

function aniversarios() {
    var date2 = new Date();
    var ho=date2.getUTCHours()+1;
    console.log(date2.getUTCDate()+"-Hora:"+ho);
    fs.readFile('./aniversarios.json', 'utf8', (err, data) => {
        if (err) throw err;
        var date = new Date();
        if (ho == 24) {
            console.log("Meia Noite");
            date.setDate(new Date().getDate()+1);   
            var dia = date.getUTCDate();
            var mes = date.getUTCMonth() + 1;
            var data2 = JSON.parse(data);
            var data3 = data2[mes];
            var data4 = data3[dia];
            if (data4 != undefined) {
                var id = data4["DiscordID"];
                if (id != undefined) {
                    console.log("Alguem faz anos");
                    client.channels.cache.get("766319634684182561").send("Parabéns <@" + id + ">.");
                    //let canalAniversario = client.guilds.cache.first().members.resolve(id).voice.channelID;
                    //let a = client.channels.cache.get(canalAniversario);
                    //if (a != undefined) {
                    //    console.log("Quem faz anos ta ON");
                    //    a.join();
                    //    client.voice.connections.first().play(ytdl("https://www.youtube.com/watch?v=scboWq7ZQGs", { filter: "audioonly" }));
                    //    setTimeout(dc, 65000);
                    //}
                }
            }
        }
    });
}

client.login(process.env.BOT_TOKEN);