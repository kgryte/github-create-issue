'use strict';

// MODULES //

var debug = require( 'debug' )( 'github-create-issue:options' );
var getHeaders = require( './headers.js' );


// MAIN //

/**
* Returns request options based on provided options.
*
* @private
* @param {Object} opts - provided options
* @param {string} opts.method - request method
* @param {string} opts.protocol - request protocol
* @param {string} opts.hostname - endpoint hostname
* @param {number} opts.port - endpoint port
* @param {string} [opts.token] - GitHub access token
* @param {string} [opts.accept] - media type
* @param {string} [opts.useragent] - user agent string
* @returns {Object} request options
*/
function options( opts ) {
	var out = {};

	out.method = opts.method;
	debug( 'Method: %s', opts.method );

	out.protocol = opts.protocol+':';
	debug( 'Protocol: %s', opts.protocol );

	out.hostname = opts.hostname;
	debug( 'Hostname: %s', opts.hostname );

	out.port = opts.port;
	debug( 'Port: %d', opts.port );

	out.headers = getHeaders( opts );
	// debug( 'Headers: %s', JSON.stringify( out.headers ) );

	return out;
} // end FUNCTION options()


// EXPORTS //

module.exports = options;
