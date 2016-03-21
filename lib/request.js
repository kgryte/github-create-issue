'use strict';

// MODULES //

var debug = require( 'debug' )( 'github-create-issue:request' );
var http = require( 'http' );
var https = require( 'https' );
var parse = require( 'utils-json-parse' );


// VARIABLES //

var RE = /^https/;


// REQUEST //

/**
* FUNCTION: request( opts, data, clbk )
*	Queries an endpoint.
*
* @param {Object} opts - request options
* @param {String} data - request data
* @param {Function} clbk - callback to invoke upon querying an endpoint
* @returns {Void}
*/
function request( opts, data, clbk ) {
	var body;
	var post;
	var req;
	var res;
	var err;

	// debug( 'Query options: %s', JSON.stringify( opts ) );

	if ( RE.test( opts.protocol ) ) {
		post = https.request;
	} else {
		post = http.request;
	}
	body = '';
	req = post( opts, onResponse );
	req.on( 'error', onError );
	req.write( data );
	req.end();

	/**
	* FUNCTION: onError( error )
	*	Event listener invoked after encountering an error.
	*
	* @private
	* @param {Error} error - error object
	* @returns {Void}
	*/
	function onError( error ) {
		debug( 'Error encountered while querying endpoint: %s', error.message );
		if ( error instanceof Error ) {
			err = {
				'status': 500,
				'message': 'Request error: ' + error.message
			};
			return clbk( err );
		}
		return clbk( error, res, body );
	} // end FUNCTION onError()

	/**
	* FUNCTION: onResponse( response )
	*	Callback invoked after receiving an HTTP response.
	*
	* @private
	* @param {Object} response - HTTP response object
	* @returns {Void}
	*/
	function onResponse( response ) {
		res = response;
		if ( res.statusCode !== 201 ) {
			err = {
				'status': res.statusCode,
				'message': ''
			};
		}
		debug( 'Received a response from query endpoint.' );
		debug( 'Response status: %s.', res.statusCode );

		debug( 'Response headers: %s', JSON.stringify( res.headers ) );

		res.setEncoding( 'utf8' );
		res.on( 'data', onData );
		res.on( 'end', onEnd );
	} // end FUNCTION onResponse()

	/**
	* FUNCTION: onData( chunk )
	*	Event listener invoked upon receiving response data.
	*
	* @private
	* @param {String} chunk - data chunk
	* @returns {Void}
	*/
	function onData( chunk ) {
		body += chunk;
	} // end FUNCTION onData()

	/**
	* FUNCTION: onEnd()
	*	Event listener invoked upon a response end.
	*
	* @private
	* @returns {Void}
	*/
	function onEnd() {
		var data;
		if ( err ) {
			err.message = body;
			return onError( err );
		}
		// debug( 'Response body: %s', body );

		data = parse( body );
		if ( data instanceof Error ) {
			err = {
				'status': 502,
				'message': 'unable to parse endpoint response data as JSON: ' + data.message
			};
			return onError( err );
		}
		clbk( null, res, data );
	} // end FUNCTION onEnd()
} // end FUNCTION request()


// EXPORTS //

module.exports = request;
