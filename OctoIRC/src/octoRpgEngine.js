//Core engine
"use strict"

var char = require("./char");
var battle = require("./battle");
var enemy = require("./enemy");

function OctoRpgEngine() {
    this._players = {}; //valid players are in here (keyed on user)
    this._battles = {}; //battles currently underway are here (keyed on user)
}
 
OctoRpgEngine.prototype.createPC = function(user) {
    if (user in this._players) {
        return "You have already created a char! Please delete it to create a new one.";
    }

    this._players[user] = new char(user, 1);
}

OctoRpgEngine.prototype.deletePC = function(user) {
    if (user in this._players) {
        delete this._players[user];
        return "Player character deleted.";
    }

    return "You have no character to delete.";
}

OctoRpgEngine.prototype.startFight = function(user) {
    if (!user in this._player) {
        return "Aren't you eager! You need to create a character first.";
    }

    if (user in this._battles) {
        return "You are already in a battle. Why would you try and start a new one!";
    }

    var player = this._players[user];
    var enemyToFight = new enemy();
    _battles[user] = new battle(player, enemyToFight);

    return player.name + " (level " + player.level + ") has picked a fight with " + enemy.name + "(level " + enemy.level + ").";
}

OctoRpgEngine.prototype.processAttack = function(user) {
    if (!user in this._battles) {
        return "You haven't started a fight with anyone yet!";
    }

    var battle = this._battles[user];
    var result = battle.processRound('attack');

    if (battle.isOver()) {
        delete this._battles[user];
    }

    return result;
}

OctoRpgEngine.prototype.flee = function(user) {
    if (!user in this._battles) {
        return "Flee from what?";
    }

    delete this._battles[user];
    return "You have sucessfully fled.";
}

OctoRpgEngine.prototype.getStats = function(user) {
    if (!user in this._players) {
        return "You need to create a character to do this first!";
    }

    var player = this._players[user];
    var infoStrings = [];
    infoStrings.push("Stats for " + player.name);
    infoStrings.push(" - Current HP: " + player.health);
    infoStrings.push(" - Current Level: " + player.level);
    
    if (user in this._battles) {
        infoStrings.push(" - Currently in battle, why are you checking your stats?!");
    } else {
        infoStrings.push(" - Currently not in a battle");
    }

    return infoStrings;
}

module.exports = OctoRpgEngine;
