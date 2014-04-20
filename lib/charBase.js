//Class to manage player chars
"use strict"

function CharBase(name, level, maxHealth, attr) {
    this._name = name;
    this._level = level;
    this._health = maxHealth;
    this._maxHealth = maxHealth;
    this._totalXp = 0;
    this._xpForLevel = 0;
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

CharBase.prototype.getHealth = function() {
    return this._health;
}

CharBase.prototype.getXP = function() {
    return this._totalXp; 
}

CharBase.prototype.getAttr = function() {
    return this._attributes; 
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

CharBase.prototype.calculateXPForLevel = function(currentLevel) {
    return Math.floor(currentLevel^2.3 + currentLevel*25 + 40);
}

CharBase.prototype.xpForCurrLevel = function() {
    return this.calculateXPForLevel(this._level);
}

CharBase.prototype.addXP = function(experience) {
    this._totalXp += experience;
    this._xpForLevel += experience;

    if (30 <= this._level) {
        return false;
    }

    if (this.xpForCurrLevel() <= this._xpForLevel) {
        this._level++;
        this._xpForLevel = 0;
        return true;
    }
    
    return false;
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

