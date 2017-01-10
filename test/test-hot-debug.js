
var should = require('should');
var hotDebug = require('../index');
var createDebug = require('debug');

createDebug.formatArgs = function () {};

describe('Hot Debug', function () {
	it('allows debug to be enabled and disabled at runtime', function () {

		var debug = createDebug('test-hot-debug');
		var logs = [];

		debug.log = function (msg) {
			logs.push(msg);
		}

		debug.enabled.should.be.false();
		debug('should not be logged');

		createDebug.enable('test*');
		debug.enabled.should.be.true();
		debug('should be logged');

		createDebug.disable();
		debug.enabled.should.be.false();
		debug('should not be logged');

		logs.should.eql([ 'should be logged' ]);
	})
})
