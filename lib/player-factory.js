var UserPlayer = require("../lib/user-player");
var ComputerPlayer = require("../lib/computer-player");
var helpers = require('./helper');

function PlayerFactory(weaponProvider, userWeaponChoiceProvider) {
    this.gameLogicStrategy = weaponProvider;
    this.userWeaponChoiceProvider = userWeaponChoiceProvider;
}

/**
 * Create computer player.
 * @returns {ComputerPlayer}
 */
PlayerFactory.prototype.createComputerPlayer = function (name) {
    if (helpers.isNullOrWhitespace(name)) {
        throw new Error('Invalid player name.');
    }

    var player = new ComputerPlayer(this.gameLogicStrategy);
    player.name = name;
    return player;
};

/**
 *Create user player.
 * @returns {UserPlayer}
 */
PlayerFactory.prototype.createUserPlayer = function (name) {
    if (helpers.isNullOrWhitespace(name)) {
        throw new Error('Invalid player name.');
    }

    var player = new UserPlayer(this.userWeaponChoiceProvider);
    player.name = name;
    return player;
};

/**
 * exports
 */
module.exports = PlayerFactory;
