'use strict';

// MODULES //

var EventEmitter = require( 'events' ).EventEmitter;
var noop = require( '@kgryte/noop' );
var Response = require( './response.js' );


// REQUEST //

/**
* FUNCTION: create( ref, err[, statusCode] )
*	Returns a mock HTTP request constructor.
*
* @param {Object} ref - reference to parent object
* @param {Error|Null} err - error object
* @param {Number} [statusCode=201] - response status code
* @returns {Request} mock HTTP request constructor
*/
function create( ref, err, statusCode ) {
	statusCode = statusCode || 201;

	/**
	* FUNCTION: Request( opts, clbk )
	*	Mock HTTP request constructor.
	*
	* @constructor
	* @param {Object} opts - request options
	* @param {Function} clbk - callback to invoke after receiving a response
	* @returns {Request} mock HTTP request object
	*/
	function Request( opts, clbk ) {
		var self;
		if ( !( this instanceof Request ) ) {
			return new Request( opts, clbk );
		}
		self = this;
		EventEmitter.call( this );

		ref._opts = opts;

		setTimeout( onTimeout, 0 );

		return this;

		/**
		* FUNCTION: onTimeout()
		*	Callback invoked in the next event loop.
		*
		* @private
		* @returns {Void}
		*/
		function onTimeout() {
			if ( err ) {
				return self.emit( 'error', err );
			}
			clbk( new Response( statusCode ) );
		}
	} // end FUNCTION Request()

	Request.prototype = Object.create( EventEmitter.prototype );

	Request.prototype.constructor = Request;

	Request.prototype.write = noop;

	Request.prototype.end = noop;

	return Request;
} // end FUNCTION create()


// EXPORTS //

module.exports = create;
