'use strict';

// MODULES //

var EventEmitter = require( 'events' ).EventEmitter;
var noop = require( '@kgryte/noop' );
var data = require( './results.json' );


// RESPONSE //

/**
* FUNCTION: Response( statusCode )
*	Mock HTTP response constructor.
*
* @constructor
* @param {Number} statusCode - mock status code
* @returns {Response} mock HTTP response object
*/
function Response( statusCode ) {
	var self;
	if ( !( this instanceof Response ) ) {
		return new Response( statusCode );
	}
	EventEmitter.call( this );
	this.statusCode = statusCode;

	self = this;
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
		if ( statusCode !== 201 ) {
			self.emit( 'data', 'bad request' );
			return self.emit( 'end' );
		}
		self.emit( 'data', JSON.stringify( data ) );
		self.emit( 'end' );
	}
} // end FUNCTION Response()

Response.prototype = Object.create( EventEmitter.prototype );

Response.prototype.constructor = Response;

Response.prototype.setEncoding = noop;


// EXPORTS //

module.exports = Response;
