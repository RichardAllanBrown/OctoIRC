//Bot code, simple fight to start with
"use strict";

var irc = require("irc");

var config = {
    channels: ["rokusho"],
    server: "irc.freenode.net",
    botName: "OctoRPG",
};

var wordings = {
    startFight: "!STARTFIGHT",
    attack: "!ATTACK",
    flee: "!RUN"
}

var currentBattles = [];

var bot = new irc.Client(config.server, config.botName, { channels: config.channels });
console.log("bot on-line");

bot.addListener("error", function(message) {
    console.log("error: ", message);
    console.log("\n");
});

bot.addListener("message", function(from, to, text, message) {
    if (text.toUpperCase() === wordings.startFight) {
        if (getByPlayername(currentBattles, from)) { 
            bot.say(config.channels[0], "You are already in battle!");
            return;
        }

        var battle = {
            player: from,
            health: 10, 
            enemy: {
                health: 6,
                name: "Goblin",
                level: 1
            }
        };
               
        bot.say(config.channels[0], battle.player + " has picked a fight with a lowly " + battle.enemy.name + " (lvl " + battle.enemy.level + ")!");

        currentBattles.push(battle);
    }

    if (text.toUpperCase() === wordings.flee) {
        if (!getByPlayername(currentBattles, from)) {
            bot.say(config.channels[0], "Run from what?");
            return;
        }

        var battle = getByPlayername(currentBattles, from);
        bot.say(config.channels[0], "You sucessfully ran from the " + battle.enemy.name + "!");
        currentBattles = currentBattles.filter(function(o) { return o.player !== from } );
    }

    if (text.toUpperCase() === wordings.attack) {
        var battle = getByPlayername(currentBattles, from);
        if (!battle) {
            bot.say(config.channels[0], "Attack what?");
            return;
        }

        var playerAttText = battle.player + " swings his sword at the " + battle.enemy.name + ", ";

        //player attacks
        var damage = rollForDamage();
        battle.enemy.health -= damage;

        if (damage === 0) {
            playerAttText += "but missed!";
        } else {
            playerAttText += "stiking flesh and deals " + damage + " damage.";
        }

        bot.say(config.channels[0], playerAttText);

        //Check to see if enemy is dead
        if (battle.enemy.health <= 0) {
            bot.say(config.channels[0], "The " + battle.enemy.name + " is slain!");
            currentBattles = currentBattles.filter(function(o) { return o.player !== from } );
            return;
        }

        //Enemy counters
        var enemyAttText = "The " + battle.enemy.name + " tries to hit " + battle.player + ", ";

        var enemyResult = rollForDamage();
        battle.health -= enemyResult;
        if (enemyResult === 0) {
            enemyAttText += "but missed!";
        } else {
            enemyAttText += "sucessfully and deals " + enemyResult + " damage!";
        }

        bot.say(config.channels[0], enemyAttText);

        //Check to see if the player is dead
        if (battle.health <= 0) {
            bot.say(config.channels[0], battle.player + " has died. RIP.");
            currentBattles = currentBattles.filter(function(o) { return o.player !== from } );
            return;
        }

        //Finally, show the healths of combatants
        bot.say(config.channels[0], battle.player + " you are on " + battle.health + "hp.");
        bot.say(config.channels[0], "The " + battle.enemy.name + " is on " + battle.enemy.health + "hp.");
    }
});

function getByPlayername(arr, name) {
    var result = arr.filter(function(o) { return o.player === name; } );
    return result ? result[0] : null;
}

function rollForDamage() {
    var rollResult = Math.floor(Math.random() * 21);
    if (18 < rollResult) {
        return 2
    } else if (8 < rollResult) {
        return 1;
    }

    return 0;
}