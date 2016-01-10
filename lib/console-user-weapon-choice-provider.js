/**
 * Module dependencies.
 */

var readline = require('readline');
var util = require('util');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

function UserWeaponChoiceProvider(gameLogicStrategy) {
    this.gameLogicStrategy = gameLogicStrategy;
}

/**
 * Get user choice from console default is `paper`.
 * @param cb
 */
UserWeaponChoiceProvider.prototype.getInput = function (cb) {

    var w = [];
    for (var i = 0; i < this.gameLogicStrategy.weapons.length; i++) {
        w.push(util.format('%s(%d)', this.gameLogicStrategy.weapons[i], i));
    }

    rl.question(util.format('Make your move: %s.\n', w.join(', ')), function (answer) {
        if (answer !== '') {
            var weapon = this.gameLogicStrategy.weapons[answer];
            if (answer <= this.gameLogicStrategy.weapons.length && weapon) {
                cb(null, weapon);
            } else {
                console.log('[INFO] You entered wrong weapon, `paper` will be use default.');
                cb(null, 'paper');
            }
        } else {
            console.log('[INFO] You entered wrong weapon, `paper` will be use default.');
            cb(null, 'paper');
        }
    }.bind(this));
};


/**
 * exports
 */
module.exports = UserWeaponChoiceProvider;