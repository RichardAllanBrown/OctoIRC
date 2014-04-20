//class for enemies
"use strict"

function Enemy(name, level, startHealth) {
    this._name = name,
    this._level = level;
    this._health = startHealth;
    this._xp = 0;
}

Enemy.prototype.getHealth = function() {
    return this._health
}

Enemy.prototype.isDead = function() {
    return this._health <= 0;
}

Enemy.prototype.getName = function() {
    return this._name;
}

Enemy.prototype.getLevel = function() {
    return this._level;
}

Enemy.prototype.addXP = function (xpToAdd) {
    this._xp += xpToAdd;
}

module.exports = Enemy;