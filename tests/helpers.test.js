var assert = require('assert');
var should = require('should');

var helpers = require("../lib/helper");

describe('helpers', function () {

    it('should throw Error when input null', function (done) {
        helpers.isNullOrWhitespace(null).should.be.exactly(true);
        done();
    });

    it('should throw Error when input whitespace', function (done) {
        helpers.isNullOrWhitespace(' ').should.be.exactly(true);
        done();
    });

    it('should return true when input valid', function (done) {
        helpers.isNullOrWhitespace('test').should.be.exactly(false);
        done();
    });


});
