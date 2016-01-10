var sinon = require('sinon');
var proxyquire = require('proxyquire');
var should = require('should');
var util = require('util');

var interfaceInstance = {
    question: function (answer, cb) {
    }, close: function () {
    }
};

var readline = {
    createInterface: function (opts) {
    }
};

var ConsoleUserWeaponChoiceProvider;

describe('console weapon choice provider', function () {
    var readlineMock, interfaceInstanceMock, choiceProvider, weaponProvider;

    var testWeaponsEnum = {
        rock: 0,
        paper: 1,
        scissors: 2
    };

    before(function () {
        readlineMock = sinon.mock(readline);
        readlineMock.expects('createInterface').returns(interfaceInstance).once();
        ConsoleUserWeaponChoiceProvider = proxyquire('../lib/console-user-weapon-choice-provider', {'readline': readline});
    });

    beforeEach(function () {
        interfaceInstanceMock = sinon.mock(interfaceInstance);
        weaponProvider = {
            weapons: Object.keys(testWeaponsEnum)
        };
        choiceProvider = new ConsoleUserWeaponChoiceProvider(weaponProvider);
    });

    it('should get input from readline', function (done) {

        initInputMock('rock');

        choiceProvider.getInput(function (err, result) {

            should.not.exists(err);
            should.exist(result);

            done();
        });
    });

    it('should send rock when  input is `rock`', function (done) {

        initInputMock(testWeaponsEnum.rock);

        choiceProvider.getInput(function (err, result) {

            should.not.exist(err);
            should.exist(result);
            result.should.be.exactly('rock');

            done();
        });
    });

    it('should send paper when  input is `paper`', function (done) {

        initInputMock(testWeaponsEnum.paper);

        choiceProvider.getInput(function (err, result) {

            should.not.exist(err);
            should.exist(result);
            result.should.be.exactly('paper');

            done();
        });
    });

    it('should send scissors when  input is `scissors`', function (done) {

        initInputMock(testWeaponsEnum.scissors);
        choiceProvider.getInput(function (err, result) {

            should.not.exist(err);
            should.exist(result);
            result.should.be.exactly('scissors');

            done();
        });
    });

    it('should send `paper` as  default input when user enter invalid input', function (done) {

        initInputMock(666);

        choiceProvider.getInput(function (err, result) {

            should.not.exist(err);
            should.exist(result);
            result.should.be.exactly('paper');

            done();
        });
    });


    it('should send `paper` as  default input when user enter is empty', function (done) {

        initInputMock('');

        choiceProvider.getInput(function (err, result) {

            should.not.exist(err);
            should.exist(result);
            result.should.be.exactly('paper');

            done();
        });
    });
    it('should list all weapons on cli question as formatted', function (done) {

        var w = [];
        for (var i = 0; i < weaponProvider.weapons.length; i++) {
            w.push(util.format('%s(%d)', weaponProvider.weapons[i], i));
        }

        interfaceInstanceMock.expects('question').withArgs(util.format('Make your move: %s.\n', w.join(', ')))
            .callsArgWith(1, testWeaponsEnum.rock)
            .once();

        choiceProvider.getInput(function (err, result) {

            should.not.exist(err);
            should.exist(result);
            result.should.be.exactly('rock');

            done();
        });
    });

    function initInputMock(input) {
        interfaceInstanceMock.expects('question').callsArgWith(1, input).once();
    }

    afterEach(function () {
        interfaceInstanceMock.verify();
    });

    after(function () {
        readlineMock.verify();
    });
});
