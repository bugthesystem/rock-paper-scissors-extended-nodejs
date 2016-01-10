var assert = require('assert');
var should = require('should');
var sinon = require('sinon');

var ComputerPlayer = require("../lib/computer-player");


describe('computer player', function () {
    var player, weaponProvider, weaponProviderMock;

    beforeEach(function () {
        weaponProvider = {
            weapons: ["a", "b", "c", "d", "e"]
        };

        weaponProviderMock = sinon.mock(weaponProvider);

        player = new ComputerPlayer(weaponProvider);
    });

    it('should create new instance', function (done) {
        should.exist(player);
        done();
    });

    it('should call `makeChoice` callback.', function (done) {

        player.makeChoice(function (err, choice) {
            should.not.exist(err);
            should.exist(choice);
            done();
        });
    });

    it('should call `makeChoice` callback with valid input.', function (done) {

        player.makeChoice(function (err, choice) {
            should.not.exist(err);
            weaponProvider.weapons.should.containEql(choice);
            done();
        });
    });
});
