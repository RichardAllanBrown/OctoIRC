//class for enemies

"use strict"

function Enemy() {
    this.name = "Goblin",
    this.level = 1;
    this.health = 6;
}

Enemy.prototype.isDead = function() {
    return this.health <= 0;
}

module.exports = Enemy;