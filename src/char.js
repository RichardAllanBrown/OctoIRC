//Class to manage player chars
"use strict"

function Char(name, level) {
    this._name = name;
    this._level = level;
    this._health = 10;
}

Char.prototype.isDead = function() {
    return this._health <= 0;
}

Char.prototype.levelUp = function() {
    this._level++;
}

Char.prototype.getName = function() {
    return this._name;
}

Char.prototype.damage = function(damage) {
    this._health -= damage;
}

module.exports = Char;