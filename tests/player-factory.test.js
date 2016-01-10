var sinon = require('sinon');
var should = require('should');
var PlayerFactory = require("../lib/player-factory");
var UserPlayer = require("../lib/user-player");
var ComputerPlayer = require("../lib/computer-player");

describe('player factory', function () {

    var playerFactory, weaponProviderMock, userWeaponChoiceProviderMock;

    beforeEach(function () {

        var weaponProvider = {};
        weaponProviderMock = sinon.mock(weaponProvider);
        var userWeaponChoiceProvider = {};
        userWeaponChoiceProviderMock = sinon.mock(userWeaponChoiceProvider);

        playerFactory = new PlayerFactory(weaponProvider, userWeaponChoiceProvider);
    });

    it('should throw `Error` try to create `user` player with invalid username', function (done) {
        (function () {
            playerFactory.createUserPlayer(null);
        }).should.throw(Error);

        done();
    });

    it('should create `user` player', function (done) {
        var name = 'user-player';
        var userPlayer = playerFactory.createUserPlayer(name);

        userPlayer.should.be.an.instanceOf(UserPlayer);
        userPlayer.name.should.be.exactly(name);

        done();
    });


    it('should throw `Error` try to create `computer` player with invalid username', function (done) {
        (function () {
            playerFactory.createComputerPlayer(null);
        }).should.throw(Error);

        done();
    });

    it('should create `computer` player', function (done) {
        var name = 'computer-player';
        var userPlayer = playerFactory.createComputerPlayer(name);

        userPlayer.should.be.an.instanceOf(ComputerPlayer);
        userPlayer.name.should.be.exactly(name);

        done();
    });

});
