'use strict';

function getOpts() {
	var opts = {
		'token': 'abcdef',
		'hostname': 'api.github.com',
		'port': 443,
		'protocol': 'https',
		'title': 'Big bug.'
	};
	return opts;
}


// EXPORTS //

module.exports = getOpts;
