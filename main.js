#!/usr/bin/env node

/**
 * Module dependencies.
 */

var WeaponChoiceProvider = require('./lib/console-user-weapon-choice-provider');
var PlayerFactory = require('./lib/player-factory');

var GameLogicStrategyResolver = require("./lib/game-logic-strategy-resolver");

var GameEngine = require('./lib/game');
var util = require("util");
var readline = require('readline');

var gameLogicStrategyResolver = new GameLogicStrategyResolver();
var cli = initConsoleInterface();
var gameMode, choiceProvider, playerFactory, gameInstance;

function init() {
    resolveGameStrategy(function (err, gameLogicStrategy) {
        if (err) {
            console.log(err);
            return exit();
        }

        choiceProvider = new WeaponChoiceProvider(gameLogicStrategy);
        playerFactory = new PlayerFactory(gameLogicStrategy, choiceProvider);
        gameInstance = new GameEngine(playerFactory, gameLogicStrategy);

        program();
    });
}

init();

function program() {
    function playGame() {
        if (gameMode === '1') {
            gameInstance.addPlayer(GameEngine.PlayerType.Computer);
            gameInstance.addPlayer(GameEngine.PlayerType.Computer);
        } else if (gameMode === '2') {
            gameInstance.addPlayer(GameEngine.PlayerType.Computer);
            gameInstance.addPlayer(GameEngine.PlayerType.User);
        }
        else {
            gameMode = undefined;
            console.reset();
            return program();
        }

        gameInstance.play(function (err, results) {
            if (err) {
                console.log(err);
                return exit();
            }

            printGameResults(results);

            gameInstance.clear();

            if (gameMode !== '1') {
                playGame();
            } else {
                setTimeout(playGame, 2000);
            }
        });
    }

    printSimpleMenu();

    cli.question('> Select player mode: computer vs computer(1) or player vs computer(2)\n', function (answer) {
        if (answer === 'Q') {
            console.reset();
            return init();
        }
        gameMode = answer;
        playGame();
    });
}

/**
 * Print simple menu
 */
function printSimpleMenu() {
    console.log("======================================================");
    console.log('===========  Rock-paper-scissors Game      ===========');
    console.log('===========  To return main menu (Shift+q) ===========');
    console.log('===========  To exit (Ctrl+C)              ===========');
    console.log("======================================================\n");
}

/**
 *Create console interface to read line
 * @returns {*}
 */
function initConsoleInterface() {

    var stdin = process.stdin;

    var consoleInterface = readline.createInterface({
        input: stdin,
        output: process.stdout,
        terminal: true
    }).on('close', function () {
        exit();
    });

    stdin.on('keypress', function (ch, key) {
            if (key && key.shift && key.name == 'q') {
                gameMode = undefined;
                console.reset();
                gameInstance.clear();
                return init();
            }
        }
    );

    return consoleInterface;
}

/**
 * Kill process and exit.
 */
function exit() {
    console.log('Exiting the game now, goodbye!');
    process.exit(0);
}

/**
 * Reset console
 */
console.reset = function () {
    return process.stdout.write('\033c');
};


/**
 * Resolve game strategy using given input
 */
function resolveGameStrategy(cb) {
    var strategy;
    cli.question('> Select game logic: basic(1) or extended with additional weapons(2)\n', function (input) {
        if (input && input !== '1' && input !== '2') {
            return resolveGameStrategy(cb);
        }

        if (input === '1') {
            strategy = gameLogicStrategyResolver.resolve(GameLogicStrategyResolver.StrategyTypes.default);
        } else {
            strategy = gameLogicStrategyResolver.resolve(GameLogicStrategyResolver.StrategyTypes.extended);
            console.log('[INFO] Game will start with additional weapons `lizard` and `spock`.\n');
            strategy.addWeapons({beater: 'lizard', beaten: 'spock', beaterExistingWeapon: 'rock'});
        }

        cb(null, strategy);
    });
}

/**
 * Print game results
 * @param results
 */
function printGameResults(results) {
    results.forEach(function (result) {
        if (result.type === 'win') {
            console.log(util.format('%s(%s) beats %s(%s).\n',
                result.winner.player, result.winner.choice,
                result.loser.player, result.loser.choice));
        } else {//tie
            var p1 = result.players[0], p2 = result.players[1];
            console.log(util.format('%s(%s) tie %s(%s).\n', p1.player, p1.choice, p2.player, p2.choice));
        }
    });
}
