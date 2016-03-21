'use strict';

// MODULES //

var debug = require( 'debug' )( 'github-create-issue:options' );
var getHeaders = require( './headers.js' );


// OPTIONS //

/**
* FUNCTION: options( opts )
*	Returns request options based on provided options.
*
* @param {Object} opts - provided options
* @param {String} opts.method - request method
* @param {String} opts.protocol - request protocol
* @param {String} opts.hostname - endpoint hostname
* @param {Number} opts.port - endpoint port
* @param {String} [opts.token] - Github access token
* @param {String} [opts.accept] - media type
* @param {String} [opts.useragent] - user agent string
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
