var assert = require('assert');
var should = require('should');

var Player = require("../lib/player");

describe('abstract player', function () {
    var player;

    beforeEach(function () {
        player = new Player();
    });

    it('should create new instance', function (done) {
        should.exist(player);
        done();
    });

    it('should throw an `Error` when makeChoice called', function (done) {

        (function () {
            player.makeChoice();
        }).should.throw(Error);
        
        done();
    });
});
