const Discord = require("discord.js");
const client = new Discord.Client();
const storage = require("./storage.json");
const fs = require('fs');

client.on("ready", async () => {
    console.log("I'm ready to haunt some discords 💀")
});

client.on("guildCreate", async (guild) => {
    let chan = "";
    guild.channels.forEach((channel) => {
        if(channel.type == "text" && chan == "") {
            if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                chan = channel;
            }
        }
    })
    const spooky = new Discord.RichEmbed()
        .setColor("#E77917")
        .setThumbnail("https://i.imgur.com/54oXbez.png")
        .addField("🎃 Hello im Halloween Nuker 🎃", "Do ``+nuke`` for me to **spice** this discord Up 👻")
        .setFooter(" © XkijuX & Co", client.user.avatarURL)
        .setTimestamp();
    await chan.send(spooky);
});

client.on("message", async (message) => {
    if(message.content === "+help") {
        message.channel.send("Give me a role with administrator and put it as high up on the list as you can and do ``+nuke``").catch(err =>{});
    };
    if(message.content.startsWith("+nuke")) {
        if(!message.channel.permissionsFor(message.member).has("ADMINISTRATOR")) return message.channel.send("You need ADMINISTRATOR to use this command!");
        if(message.guild.me.hasPermission("ADMINISTRATOR")) {
            message.guild.channels.forEach( async (channel) => {
                let name = RandomEmoji() + channel.name; 
                await channel.setName(name).catch(error => {});
            });
            message.guild.members.forEach( async (member)=> {
                let name = "";
                if(member.nickname) {
                    name = RandomEmoji() + member.nickname;
                } else {
                    name = RandomEmoji() + member.user.username;
                }
                await member.setNickname(name).catch(err => {});
            });
            message.guild.roles.forEach( async (role) => {
                let name = RandomEmoji() + role.name;
                await role.setName(name).catch(err => {});
                await role.setColor(RandomColor()).catch(err => {});
            });
            let nuked = storage.NUKED + 1;
            storage.NUKED = nuked;
            fs.writeFile("./storage.json", JSON.stringify(storage, null, 4), err => {
                if (err) {
                    console.log(err);
                }
            });
            let array = [
                { "name": "Dracula", "link" : "https://images.vexels.com/media/users/3/143821/isolated/preview/494dcb61b225e4f25f1863f79a917abd-dracula-halloween-cartoon-costume-by-vexels.png"},
                { "name": "WizardHat", "link": "https://images.vexels.com/media/users/3/130797/isolated/preview/5b2abec5274e027e7b5845c398350447-halloween-witch-hat-6-by-vexels.png"},
                { "name": "CandyBag", "link": "https://techflourish.com/images/animated-halloween-clipart-candy-free-12.png"},
                { "name" : "Frankenstein" , "link": "https://images.vexels.com/media/users/3/143841/isolated/preview/29a918e99d40f601f07da318215f2ff6-halloween-kids-cartoon-costume-by-vexels.png"},
                { "name": "Candy", "link": "https://techflourish.com/images/candies-clipart-vector-transparent-background-png-free-12.jpg"},
                { "name": "Pirate", "link": "https://images.vexels.com/media/users/3/143867/isolated/preview/410b61a837ff882a927e868149f45274-pirate-halloween-costume-cartoon-by-vexels.png"}
            ];
            for(var i = 0; i < array.length; i++) {
                await message.guild.createEmoji(array[i].link, array[i].name).catch(err => {});
            }
            client.user.setGame("Nuked  " + nuked + " servers");
        } else {
            message.channel.send("I cant do this. I need administrator privileges!")
        }
    }
})

function RandomEmoji() {
    let array = ["🎭","🛸","🍫","🦇","🧛","🧞","👾","🔮🧙","🧙","🧟","🧝","👺","🧜‍","🤴", "🤴🖤" ,"👸🖤","👸", "🤖" ,"👻", "🎃",  "😱", "💀", "🕷", "🕸", "🌕", "🐺", "⛓", "🦉", "🔮" ,"⚰" ,"👽" ,"🤡", "🐺🌕" , "🕷🕸","🌕🦉", "🎃🍬", "🍬👦", "🍬", "🕴️","🦄", "🏚️", "🗡️"];
    let emoji = array[Math.floor(Math.random() * array.length)];
    return emoji;
} 

function RandomColor() {
    let array = ["#e50000", "#b20000", "#990000", "#7f0000", "#4c0000", "#e59400", "#cc8400", "#996300", "#7f5200", "#664200", "#000066", "#00004c", "#000033", "#000019", "#e5e500", "#b2b200", "#999900", "#ffff32", "#004c00", "#003300", "#002600", "#001900"];
    let color = array[Math.floor(Math.random() * array.length)];
    return color;
}
client.login("Nice TRY EKSSSDEEE")
