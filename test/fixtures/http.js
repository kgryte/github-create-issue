'use strict';

// MODULES //

var request = require( './request.js' );


// MAIN //

/**
* Returns a mock `http` module.
*
* @private
* @param {Error|Null} err - error object
* @param {Number} [statusCode=201] - status code
* @returns {Object} mock `http` module
*/
function http( err, statusCode ) {
	var obj = {};
	obj.request = request( obj, err, statusCode );
	return obj;
} // end FUNCTION http()


// EXPORTS //

module.exports = http;
