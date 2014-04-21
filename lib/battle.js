//Class used to manage battles
"use strict"

function Battle(player, enemy) {
    this._player = player;
    this._enemy = enemy;
}

Battle.prototype.calcDam = function() {
    var result = Math.floor(Math.random() * 21);

    if (18 < result) { return 2; }
    else if (10 < result) { return 1; }
    
    return 0;
}

Battle.prototype._rollToHit = function(textToDisplayArray, attacker, defender) {
    //strength v strength - to be replaced by a functionon the CharBase class
    

    //check for luck to dodge
}

Battle.prototype._rollForDamage = function(textToDisplayArray, attacker, defender) {
    
}

Battle.prototype.processRound = function(playerMove) {
    var textToDisplay = [];
    
    //player gets to move first
    switch (playerMove) {
        case "attack":
            var toHitText = this._player.getName() + " swings at the " + this._enemy.getName() + " with his sword";
            var damage = this.calcDam();
            enemy.health -= damage;

            if (damage === 0) {
                toHitText += ", but misses!";
            } else {
                toHitText += " and strikes flesh, doing " + damage + " damage!";
            }

            textToDisplay.push(toHitText); 
            break;

        case "item":
        case "powerAttack":
            throw new Error("Not implemented yet!");
    }

    //check to see if enemy is dead
    if (this._enemy.isDead()) {
        textToDisplay.push("The " + this._enemy.name + " has been slain!");
        return textToDisplay;
    }

    //enemy attacks player
    var enemyHitText = "The " + this._enemy.name + " tries to attack " + this._player.name;
    var playerDamage = this.calcDam();
    
    if(playerDamage === 0) {
        enemyHitText += " and misses!";
    } else {
        enemyHitText += " dealing " + playerDamage + "damage!";
    }

    textToDisplay.push(enemyHitText);

    //check to see if the player is dead
    if (this._player.isDead()) {
        textToDisplay.push(this._player.name + " has fallen in battle.")
        return textToDisplay;
    }

    //add battle status text
    textToDisplay.push(this._player.name + " has " + this._player.health + "hp.");
    textToDisplay.push(this._enemy.name + " has " + this._enemy.health + "hp.");

    return textToDisplay;
}

Battle.prototype.isOver = function() {
    return this._player.isDead || this._enemy.isDead;
}

module.exports = Battle;