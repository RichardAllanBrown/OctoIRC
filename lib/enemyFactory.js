//Factory responsible for creating enemies
"use strict"

var fs = require('fs');
var Enemy = require('./charBase.js').CharBase;
var Attributes = require('./charBase.js').Attributes;

function EnemyFactory(enemyFile) {
    console.log("Reading enemy file from: " + enemyFile);

    this._templates = {};

    var buildTemplate = function(lowerSpawnLvl, upperSpawnLvl, str, dex, luck, int, con) {
        return {
            lowerLevel: lowerSpawnLvl,
            upperLevel: upperSpawnLvl,
            attAvg: new Attributes(str, dex, luck, int, con)
        }
    }

    this._templates = enemies["Goblin"] = buildTemplate(1, 5, 3, 3, 2, 2, 3);
    this._templates = enemies["Imp"] = buildTemplate(1, 4, 4, 2, 1, 4, 3);
    this._templates = enemies["Hobgoblin"] = buildTemplate(2, 6, 4, 3, 3, 3, 4);
    this._templates = enemies["Dire Wolf"] = buildTemplate(2, 7, 5, 2, 1, 2, 5);
}

EnemyFactory.prototype.buildEnemy = function(targetLevel) {
    var possibleEnemies = [];
    for (key in this._templates) {
        if (this._templates[key].lowerLevel <= targetLevel
            && targetLevel <= this._templates[key].upperLevel) {
                possibleEnemies.push(key);
        }
    }

    if (possibleEnemies.length === 0) {
        throw Error("No enemies of suitable level available");
    }

    var e = possibleEnemies[Math.floor(Math.random()*possibleEnemies.length)];

    var health = _varyValue(e.attAvg.con, 0.15);
    var attr = new Attributes(_varyValue(e.attAvg.str, 0.1), _varyValue(e.attAvg.dex, 0.1),
        _varyValue(e.attAvg.luck, 0.05), _varyValue(e.attAvg.int, 0.15), _varyValue(e.attAvg.con, 0.1))

    return new Enemy(key, targetLevel, health, 10, attr);
}

EnemyFactory.prototype._varyValue = function(value, factor) {
    var variation = value * factor;
    var adjustment = (Math.random() * 2 - 1) * variation
    
    return Math.round(value + adjustment);
}

Module.exports = EnemyFactory;
