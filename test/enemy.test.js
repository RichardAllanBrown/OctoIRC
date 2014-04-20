//Test cases for the enemy class
var assert = require("assert");
var Enemy = require('../lib/enemy.js');

describe("Enemy", function() {
    it("should not be undefined", function() {
        assert.ok(Enemy);
    });

    it("should be dead when health is 0", function() {
        var testEnemy = new Enemy();
        testEnemy._health = 0;
        assert.ok(testEnemy.isDead()); 
    });
});
