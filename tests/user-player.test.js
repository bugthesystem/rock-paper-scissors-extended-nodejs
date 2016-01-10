var assert = require('assert');
var should = require('should');
var sinon = require('sinon');

var UserPlayer = require("../lib/user-player");


describe('user player', function () {

    var player, userWeaponChoiceProvider, userWeaponChoiceProviderMock;

    beforeEach(function () {
        userWeaponChoiceProvider = {
            getInput: function (cb) {
            }
        };
        userWeaponChoiceProviderMock = sinon.mock(userWeaponChoiceProvider);

        player = new UserPlayer(userWeaponChoiceProvider);

    });

    it('should create new instance', function (done) {
        should.exist(player);
        done();
    });

    it('should throw error when `userWeaponChoiceProvider` throws error.', function (done) {

        userWeaponChoiceProviderMock.expects('getInput').callsArgWith(0, new Error(""));

        player.makeChoice(function (err, choice) {
            should.exist(err);
            done();
        });
    });

    it('should return provider input', function (done) {

        var userChoice = "rock";
        userWeaponChoiceProviderMock.expects('getInput').callsArgWith(0, null, userChoice);

        player.makeChoice(function (err, choice) {
            should.not.exist(err);
            choice.should.be.exactly(userChoice);
            done();
        });
    });

    afterEach(function () {
        userWeaponChoiceProviderMock.verify();
    });
});