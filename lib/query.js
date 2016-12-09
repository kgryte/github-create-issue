'use strict';

// MODULES //

var debug = require( 'debug' )( 'github-create-issue:query' );
var getOpts = require( './options.js' );
var getData = require( './data.js' );
var request = require( './request.js' );
var ratelimit = require( './ratelimit.js' );


// MAIN //

/**
* Queries a remote endpoint in order to create an issue.
*
* @private
* @param {String} slug - repository slug
* @param {String} title - issue title
* @param {Object} options - query options
* @param {Function} clbk - callback to invoke after completing a query
*/
function query( slug, title, options, clbk ) {
	var opts;
	var data;

	// Extract request options:
	opts = getOpts( options );

	// Set the query endpoint:
	opts.path = options.pathname;
	opts.path += slug;
	opts.path += '/issues';

	// Get the request data:
	data = getData( title, options );
	opts.headers[ 'Content-Length' ] = data.length;

	// Make the request:
	request( opts, data, done );

	/**
	* Callback invoked after completing request.
	*
	* @private
	* @param {(Error|Null)} error - error object
	* @param {Object} response - HTTP response object
	* @param {Object} data - response data
	*/
	function done( error, response, data ) {
		var info;
		if ( arguments.length === 1 ) {
			debug( 'No available rate limit information.' );
			return clbk( error );
		}
		debug( 'Request completed.' );

		// Get rate limit information:
		info = ratelimit( response.headers );
		debug( 'Rate limit: %d', info.limit );
		debug( 'Rate limit remaining: %d', info.remaining );
		debug( 'Rate limit reset: %s', (new Date( info.reset*1000 )).toISOString() );

		if ( error ) {
			return clbk( error, null, info );
		}
		clbk( null, data, info );
	} // end FUNCTION done()
} // end FUNCTION query()


// EXPORTS //

module.exports = query;
