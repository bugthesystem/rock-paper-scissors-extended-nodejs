/**
 * Enum to present user type
 * @type {{Computer: number, User: number}}
 */
var PlayerType = {
    Computer: 1,
    User: 2
};

function Game(playerFactory, gameLogicStrategy) {
    this.playerFactory = playerFactory;
    this.gameLogicStrategy = gameLogicStrategy;
    this.players = [];

    this.executeRules = function (playerChoices, cb) {
        var results = [];

        playerChoices.forEach(function (playerChoice, idx) {
            for (var i = idx + 1; i < playerChoices.length; i++) {
                var choice1 = playerChoice;
                var choice2 = playerChoices[i];

                var currentResult = this.gameLogicStrategy.canBeat(choice1.choice, choice2.choice);

                if (currentResult === -1) {
                    results.push({type: 'tie', players: [choice1, choice2]});
                } else {

                    var winner, loser;
                    if (currentResult === 1) {
                        winner = choice1;
                        loser = choice2;
                    } else { //currentResult=0
                        winner = choice2;
                        loser = choice1;
                    }

                    results.push({type: 'win', winner: winner, loser: loser});
                }
            }
        }.bind(this));

        cb(null, results);
    };
}

/**
 * Add player to game
 * @param playerType
 */
Game.prototype.addPlayer = function (playerType) {
    var player;
    if (playerType === PlayerType.Computer) {
        player = this.playerFactory.createComputerPlayer('Computer #' + (this.players.length + 1));
        this.players.push(player);
    } else if (playerType === PlayerType.User) {
        player = this.playerFactory.createUserPlayer('User');
        this.players.push(player);
    }
    else {
        throw new Error('Unknown player type ' + playerType);
    }
};

/**
 * Start the game
 * @param cb
 */
Game.prototype.play = function (cb) {
    if (this.players.length < 2) {
        return cb(new Error('At least two players should be added to start the game.'));
    }

    var playerChoices = [];
    this.players.forEach(function (player, i) {
        player.makeChoice(function (err, choice) {
            playerChoices.push({
                player: player.name,
                choice: choice
            });

            if (playerChoices.length === this.players.length) {
                this.executeRules(playerChoices, cb);
            }
        }.bind(this));
    }.bind(this));
};


/**
 *Clear game state.
 */
Game.prototype.clear = function () {
    this.players = [];
};

/**
 * exports
 */
module.exports = Game;
module.exports.PlayerType = PlayerType;
