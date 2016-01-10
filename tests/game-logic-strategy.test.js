var assert = require('assert');
var should = require('should');

var RpsGameLogicStrategy = require("../lib/game-logic-strategies/game-logic-strategy");

describe('default game logic strategy', function () {
    var gameLogicStrategy;

    beforeEach(function () {
        gameLogicStrategy = new RpsGameLogicStrategy();
    });

    it('should create new instance', function (done) {
        should.exist(gameLogicStrategy);
        done();
    });

    it('should call `weapons` property', function (done) {

        var rules = gameLogicStrategy.weapons;
        rules.should.be.an.Array();

        done();
    });

    it('should include `3` `weapons` by default', function (done) {

        var rules = gameLogicStrategy.weapons;
        rules.length.should.be.exactly(3);

        done();
    });

    it('should throw `Error` when `canBeat` called with invalid parameters', function (done) {

        (function () {
            gameLogicStrategy.canBeat("scissors", undefined);
        }).should.throw(Error);

        (function () {
            gameLogicStrategy.canBeat(undefined, "scissors");
        }).should.throw(Error);

        done();
    });

    it('should result rock beats scissors', function (done) {

        gameLogicStrategy.canBeat('rock', 'scissors').should.be.exactly(1);

        done();
    });

    it('should result paper beats rock', function (done) {

        gameLogicStrategy.canBeat('paper', 'rock').should.be.exactly(1);

        done();
    });

    it('should result rock is beaten by paper', function (done) {

        gameLogicStrategy.canBeat('rock', 'paper').should.be.exactly(0);

        done();
    });


    it('should result rock is equal to rock', function (done) {

        gameLogicStrategy.canBeat('rock', 'rock').should.be.exactly(-1);

        done();
    });


    it('should not add new weapons', function (done) {

        (function () {
            gameLogicStrategy.addWeapons({});
        }).should.throw(Error);

        done();
    });

});