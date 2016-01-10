var sinon = require('sinon');
var should = require('should');

var GameLogicStrategyResolver = require("../lib/game-logic-strategy-resolver");

var DefaultGameLogicStrategy = require('../lib/game-logic-strategies/game-logic-strategy');
var ExtendedGameLogicStrategy = require('../lib/game-logic-strategies/extended-game-logic-strategy');

describe('player factory', function () {

    var gameLogicStrategyResolver;

    before(function () {

        gameLogicStrategyResolver = new GameLogicStrategyResolver();
    });


    it('should create instance', function (done) {
        should.exists(gameLogicStrategyResolver);

        done();
    });

    it('should resolve `default` strategy', function (done) {
        var strategy = gameLogicStrategyResolver.resolve(GameLogicStrategyResolver.StrategyTypes.default);

        strategy.should.be.an.instanceOf(DefaultGameLogicStrategy);

        done();
    });

    it('should resolve `extended` strategy', function (done) {
        var strategy = gameLogicStrategyResolver.resolve(GameLogicStrategyResolver.StrategyTypes.extended);

        strategy.should.be.an.instanceOf(ExtendedGameLogicStrategy);

        done();
    });

    it('should throw given strategy type is invalid', function (done) {
        (function () {
            gameLogicStrategyResolver.resolve('invalid');
        }).should.throw(Error);

        done();
    });

});
