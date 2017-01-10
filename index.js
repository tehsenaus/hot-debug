
var createDebug = require('debug'),
	debugModulePath = require.resolve('debug'),
	debugModule = require.cache[debugModulePath];

// Yo dawg, heard you like debug...
var hotDebugDebug = createDebug('hot-debug');

// Limit this so we don't leak memory if someone goes crazy and creates instances at runtime.
var maxChangeListeners = +process.env.DEBUG_MAX_HOT || 1024;
var changeListeners = [];


module.exports = debugModule.exports = createHotDebug;

Object.keys(createDebug).forEach(function (n) {
	if ( n === 'enable' || n === 'disable' ) return;

	// Settings must be set on the orignal object
	Object.defineProperty(createHotDebug, n, {
		get: function () {
			return createDebug[n];
		},
		set: function (v) {
			createDebug[n] = v;
		}
	});
});

createHotDebug.enable = function () {
	var r = createDebug.enable.apply(this, arguments);
	notifyListeners();
	return r;
}

createHotDebug.disable = function () {
	// Workaround for https://github.com/visionmedia/debug/issues/150
	createDebug.names = [];
	createDebug.skips = [];

	var r = createDebug.disable.apply(this, arguments);
	notifyListeners();
	return r;
}

function createHotDebug(namespace) {
	hotDebugDebug("createHotDebug: %s", namespace);

	var debug = createDebug.apply(this, arguments);

	if ( changeListeners.length >= maxChangeListeners ) {
		hotDebugDebug("createHotDebug: maxChangeListeners reached (%d) - %s will not be hot", maxChangeListeners, namespace);
		return debug;
	}

	listener.namespace = namespace;
	changeListeners.push(listener);

	function listener() {
		var wasEnabled = debug.enabled;
		debug.enabled = createDebug.enabled(namespace);

		if ( wasEnabled !== debug.enabled ) {
			hotDebugDebug("%s: enabled state changed: was %s, now %s", namespace, wasEnabled, debug.enabled);
		}
	}

	return debug;
}

function notifyListeners() {
	hotDebugDebug('notifyListeners: notifying %d listeners', changeListeners.length);

	changeListeners.forEach(function (listener) {
		listener();
	});
}
