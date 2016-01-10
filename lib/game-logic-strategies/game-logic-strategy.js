/**
 * Rock Paper Scissors game logic strategy
 * @constructor
 */
function RpsGameLogicStrategy() {
    this.weaponDict = {
        rock: 1,
        scissors: 2,
        paper: 3
    };

    this.assertWeaponExists = function (weapon) {
        if (!this.weaponDict[weapon]) {
            throw new Error("Invalid weapon " + weapon);
        }
    };

    //Return weapon names as array.
    this.__defineGetter__('weapons', function () {
        return Object.keys(this.weaponDict);
    });
}


RpsGameLogicStrategy.prototype.addWeapons = function (opts) {
    throw new Error("Not implemented.");
};

/**
 * Make comparison to get which weapon beats.
 * @param weapon1
 * @param weapon2
 * @returns {number}
 */
RpsGameLogicStrategy.prototype.canBeat = function (weapon1, weapon2) {
    this.assertWeaponExists(weapon1);
    this.assertWeaponExists(weapon2);

    var weapon1Id = this.weaponDict[weapon1];
    var weapon2Id = this.weaponDict[weapon2];

    var difference = weapon2Id - weapon1Id;

    if (difference === 0) {
        return -1; // tie
    }

    if (difference < 0) {
        difference *= -1;
        difference++;
    }

    return difference % 2; // 0 : weapon2 is winner. 1:weapon1 is winner.
};


/**
 * exports
 */
module.exports = RpsGameLogicStrategy;