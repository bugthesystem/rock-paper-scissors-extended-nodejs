function Player() {
    this.name = 'Player';
}

/**
 * Abstract method that to get player's choice.
 * @param cb
 */
Player.prototype.makeChoice = function (cb) {
    throw new Error("should be implemented in subclasses");
};


/**
 * exports
 */
module.exports = Player;