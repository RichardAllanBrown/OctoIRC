//Class to manage player chars
"use strict"

function CharBase(name, level, maxHealth, xp, attr) {
    this._name = name;
    this._level = level;
    this._health = maxHealth;
    this._maxHealth = maxHealth;
    this._xp = xp;
    this._attributes = attr;
    this._equipment = {};
}

CharBase.prototype.isDead = function() {
    return this._health <= 0;
}

CharBase.prototype.getName = function() {
    return this._name;
}

CharBase.prototype.getLevel = function() {
    return this._level;
}

CharBase.prototype.damage = function(damage) {
    this._health -= damage;
}

CharBase.prototype.heal = function(heal) {
    this._health += heal;
    if (this._maxHealth < this._health) {
        this._health = this._maxHealth;
    }
}

CharBase.prototype.addXP = function(experience) {
    this._xp += experience;

    if (30 <= this._level) {
        return false;
    }

    if (_calculateXPForLevel(this._level + 1) <= this._xp) {
        this._level++;
        this._xp = 0;
        return true;
    }

    return false;
}

CharBase.prototype._calculateXPForLevel = function(level) {
    return Math.floor(level^2.6 + level*30 + 40);
}

CharBase.prototype.getXPTotal = function() {
    var total = 0;
    for (i = 1; i < this._level + 1 ; i++) {
        total += _calculateXPForLevel(i);
    }
    return total;
}

function Attributes(strength, dexterity, luck, intelligence, constitution) {
    this.str = strength,
    this.dex = dexterity,
    this.luck = luck,
    this.int = intelligence,
    this.con = constitution
}

module.exports.CharBase = CharBase;
module.exports.Attributes = Attributes;

