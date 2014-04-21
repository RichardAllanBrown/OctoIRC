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
    this.equipment = {};
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

CharBase.prototype.getDex = function() {
    return this._attributes.dex; 
}

CharBase.prototype.getStr = function() {
    return this._attributes.str; 
}

CharBase.prototype.getLuck = function() {
    return this._attributes.luck;
}

CharBase.prototype.getInt = function() {
    return this._attributes.int; 
}

CharBase.prototype.getCon = function() {
    return this._attributes.con; 
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

CharBase.prototype.isDead = function() {
    return this._health <= 0;
}

CharBase.prototype.calculateXPForLevel = function(level) {
    return Math.floor(level^2.3 + level*25 + 40);
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
    this.str = strength;
    this.dex = dexterity;
    this.luck = luck;
    this.int = intelligence;
    this.con = constitution;
}

module.exports.CharBase = CharBase;
module.exports.Attributes = Attributes;

