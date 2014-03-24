﻿//Class to manage player chars
"use strict"

function Char(name, level) {
    this.name = name;
    this.level = level;
    this.health = 10;
}

Char.prototype.isDead = function() {
    return this.health <= 0;
}

module.exports = Char;