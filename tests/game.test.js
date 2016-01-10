var assert = require('assert');
var should = require('should');
var sinon = require('sinon');

var Game = require("../lib/game");

describe('game', function () {

    var game, playerFactoryMock, weaponProviderMock;

    beforeEach(function () {
        var playerFactory = {
            createUserPlayer: function () {
            }, createComputerPlayer: function () {
            }
        };

        var weaponProvider = {
            canBeat: function (w1, w2) {

            }
        };

        playerFactoryMock = sinon.mock(playerFactory);
        weaponProviderMock = sinon.mock(weaponProvider);

        game = new Game(playerFactory, weaponProvider);
    });

    it('should create new instance', function (done) {
        should.exist(game);

        done();
    });


    it('should add a user player', function (done) {

        playerFactoryMock.expects('createUserPlayer').returns({});

        game.addPlayer(Game.PlayerType.User);

        done();
    });

    it('should add a computer player', function (done) {

        playerFactoryMock.expects('createComputerPlayer').returns({});

        game.addPlayer(Game.PlayerType.Computer);

        done();
    });


    it('should throw error for invalid player type', function (done) {

        (function () {
            game.addPlayer(0);
        }).should.throw(Error);

        done();

    });

    it('should not start without players', function (done) {

        game.play(function (err) {
            should.exists(err);
            done();
        });

    });

    it('should not start with a single player', function (done) {
        playerFactoryMock.expects('createComputerPlayer').returns({});
        game.addPlayer(Game.PlayerType.Computer);

        game.play(function (err) {
            should.exists(err);
            done();
        });
    });

    it('should play game with first player as winner', function (done) {

        mockWeaponsComparison(1, 'Player #1');

        game.play(function (err, results) {

            should.not.exists(err);

            should.exists(results);

            var result = results[0];

            result.type.should.be.exactly('win');
            result.winner.player.should.be.exactly('Player #1');

            done();
        });

    });

    it('should play game with tie', function (done) {

        mockWeaponsComparison(-1);

        game.play(function (err, results) {

            should.not.exists(err);

            should.exists(results);

            results[0].type.should.be.exactly('tie');

            done();
        });
    });

    it('should play game with second player as winner', function (done) {

        mockWeaponsComparison(0, 'Player #2');

        game.play(function (err, results) {

            should.not.exists(err);

            should.exists(results);

            var result = results[0];

            result.type.should.be.exactly('win');
            result.winner.player.should.be.exactly('Player #2');

            done();
        });

    });

    it('should clear players when clear is called and throws error calling play with no players', function (done) {

        playerFactoryMock.expects('createComputerPlayer').returns({});
        game.addPlayer(Game.PlayerType.Computer);

        playerFactoryMock.expects('createUserPlayer').returns({});
        game.addPlayer(Game.PlayerType.User);

        game.clear();

        (function () {
            game.play();
        }).should.throw(Error);

        done();
    });

    afterEach(function () {
        playerFactoryMock.verify();
    });

    function mockWeaponsComparison(canBeatResult, nameArg) {
        var choice1 = 'choice1', choice2 = 'choice2';

        playerFactoryMock.expects('createComputerPlayer').returns({
            makeChoice: function (cb) {
                cb(null, choice1);
            }, name: nameArg || 'test'
        });

        playerFactoryMock.expects('createUserPlayer').returns({
            makeChoice: function (cb) {
                cb(null, choice2);
            }, name: nameArg || 'test'
        });

        weaponProviderMock.expects('canBeat').returns(canBeatResult);

        game.addPlayer(Game.PlayerType.Computer);
        game.addPlayer(Game.PlayerType.User);
    }

});
