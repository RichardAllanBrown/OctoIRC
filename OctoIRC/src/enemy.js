//class for enemies

"use strict"

function Enemy(level) {
    this._name = "Goblin",
    this._level = level;
    this._health = 6;
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

module.exports = Enemy;