//Test cases for the enemy class
var assert = require("assert");
var enemy = require("../src/enemy");

suite("Enemy", function() {
    test("should have level default to 1", function() {
        var testEnemy = new enemy();
        assert.equal(testEnemy.getLevel(), 1);
    });

    test("should have level set when specified", function() {
        var testEnemy = new enemy(2);
        assert.equal(testEnemy.getLevel(), 2);
    });

    test("should have a name", function() {
        var testEnemy = new enemy();
        assert.ok(testEnemy.getName());
    });

    test("should have health and be alive", function() {
        var testEnemy = new enemy();
        assert.ok(testEnemy.getHealth());
        assert.ok(!testEnemy.isDead());
    });

    test("should be dead when health is 0", function() {
        var testEnemy = new enemy();
        testEnemy._health = 0;
        assert.ok(testEnemy.isDead()); 
    });
});
