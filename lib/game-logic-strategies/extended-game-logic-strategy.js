/**
 * Module dependencies.
 */

var GameLogicStrategy = require("./game-logic-strategy");
var util = require("util");
var helpers = require('../helper');

function ExtendedRpsGameLogicStrategy() {

    GameLogicStrategy.call(this);
}

util.inherits(ExtendedRpsGameLogicStrategy, GameLogicStrategy);

/**
 *  Add additional weapons.
 *
 * Add weapons as pair and the beater of the pair will be taken as an input.
 * Moreover, get as an input the name of the existing weapon that can beat the newly added beater of the pair.
 * Assume the relations between weapons is circular and attach those
 * two additional weapons right after the weapon that is given as input.
 *
 * @param opts
 */
ExtendedRpsGameLogicStrategy.prototype.addWeapons = function (opts) {

    if (helpers.isNullOrWhitespace(opts.beaten) || helpers.isNullOrWhitespace(opts.beater) || helpers.isNullOrWhitespace(opts.beaterExistingWeapon)) {
        throw new Error('Given additional weapon parameters are invalid.');
    }

    if (!this.weaponDict[opts.beaterExistingWeapon]) {
        throw new Error('Given beater existing weapon is invalid.');
    }

    var beaterExistingWeaponId;

    for (var prop in this.weaponDict) {
        var currentWeaponId = this.weaponDict[prop];
        if (opts.beaterExistingWeapon !== prop) {
            this.weaponDict[prop] = currentWeaponId + 2;
        } else {
            beaterExistingWeaponId = currentWeaponId;
        }
    }

    this.weaponDict[opts.beater] = beaterExistingWeaponId + 1;
    this.weaponDict[opts.beaten] = beaterExistingWeaponId + 2;
};

/**
 * If we'd like to implement own beat algorithm,
 * we can implement it by overriding canBeat method that comes from base class as follows;
 *
 YourRpsGameLogicStrategy.prototype.canBeat = function (weapon1, weapon2) {
    //implementation
 };
 */

/**
 * exports
 */
module.exports = ExtendedRpsGameLogicStrategy;