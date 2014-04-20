//Tests that the char base clas function as expected

var assert = require('assert');
var CharBase = require('../lib/charBase.js').CharBase;
var Att = require('../lib/charBase.js').Attributes;

describe("Char Base", function() {
    var testChar;
    
    beforeEach(function() {
        testChar = new CharBase("anyName", 1, 12, new Att(9, 8, 7, 6, 5));
    });

    it("should have a name", function() {
        assert.equal(testChar.getName(), "anyName");
    });

    it("should have a level", function() {
        assert.equal(testChar.getLevel(), 1);
    });

    it("should have health set to max health", function() {
        assert.equal(testChar.getHealth(), 12);
    });

    it("should have no experience", function() {
        assert.equal(testChar.getXP(), 0);
    });
    
    it("should have attributes", function() {
        assert.equal(testChar.getAttr().str, 9);
        assert.equal(testChar.getAttr().dex, 8);
        assert.equal(testChar.getAttr().luck, 7);
        assert.equal(testChar.getAttr().int, 6);
        assert.equal(testChar.getAttr().con, 5);
    });

    it("can be damaged", function() {
        testChar.damage(3);
        assert.equal(testChar.getHealth(), 9);
    });

    it("can be damaged and healed", function() {
        testChar.damage(5);
        testChar.heal(1);
        assert.equal(testChar.getHealth(), 8);
    });

    it("cannot be healed above max health", function() {
        testChar.damage(4);
        testChar.heal(24);
        assert.equal(testChar.getHealth(), 12);
    });

    it("should be dead when health is at zero", function() {
        testChar._health = 0;
        assert.ok(testChar.isDead());
    });

    it("should have the ability to gain experience", function() {
        testChar.addXP(10);
        assert.equal(testChar.getXP(), 10);
    });

    it("should level up with correct amount of XP", function() {
        assert.equal(testChar.getLevel(), 1);
        var xpNeeded = testChar.calculateXPForLevel(1);
        testChar.addXP(xpNeeded);
        assert.equal(testChar.getLevel(), 2);
    });
});
