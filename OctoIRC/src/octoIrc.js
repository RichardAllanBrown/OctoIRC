//Main class to start from
"use strict"

var irc = require("irc");
var engine = require("./octoRpgEngine");

//modify to alter irc client settings
var config = {
    channels: ["#wangingout"],
    server: "irc.freenode.net",
    botName: "OctoRPG",
};

//modify to change command words used by players
var wordings = {
    startFight: "!STARTFIGHT",
    attack: "!ATTACK",
    flee: "!RUN",
    createPC: "!CREATEPC",
    deletePC: "!DELETEPC",
    stats: "!STATS"
}

var bot = new irc.Client(config.server, config.botName, { channels: config.channels });
var game = new engine();
console.log("bot on-line");

bot.addListener("error", function(message) {
    console.log("error: ", message);
    console.log("\n");
});

bot.addListener("message", function(from, to, text, message) {
    var textToReply;
    switch (text.toUpperCase()) {
        case wordings.startFight:
            textToReply = game.startFight(from);
            console.log("a new fight was started: ", from);
            break;

        case wordings.createPC:
            textToReply = game.createPC(from);
            console.log("new char created: ", from);
            break;

        case wordings.deletePC:
            textToReply = game.deletePC(from);
            console.log("new char deleted: ", from);
            break;

        case wordings.flee:
            textToReply = game.flee(from);
            break;

        case wordings.attack:
            textToReply = game.processAttack(from);
            break;

        case wordings.stats:
            textToReply = game.getStats(from);
            break;

        default:
            return;
    }

    if (textToReply) {
        sayTo(from, textToReply);
    }
});

var sayTo = function() {
    for (var i = 1; i < arguments.length; i++) {
        bot.say(arguments[0], arguments[i]);
    }
}