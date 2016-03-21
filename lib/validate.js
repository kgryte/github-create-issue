'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isString = require( 'validate.io-string-primitive' );
var isPositiveInteger = require( 'validate.io-positive-integer' );
var isStringArray = require( 'validate.io-string-primitive-array' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {String} options.token - Github access token
* @param {String} [options.useragent] - user agent string
* @param {String} [options.body] - issue content
* @param {String} [options.assignee] - Github username of an assigned user
* @param {Number} [options.milestone] - number of associated milestone
* @param {String[]} [options.labels] - issue labels
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	opts.token = options.token;
	if ( !isString( opts.token ) ) {
		return new TypeError( 'invalid option. `token` option must be a string primitive. Option: `' + opts.token + '`.' );
	}
	if ( options.hasOwnProperty( 'body' ) ) {
		opts.body = options.body;
		if ( !isString( opts.body ) ) {
			return new TypeError( 'invalid option. `body` option must be a string primitive. Option: `' + opts.body + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'assignee' ) ) {
		opts.assignee = options.assignee;
		if ( !isString( opts.assignee ) ) {
			return new TypeError( 'invalid option. `assignee` option must be a string primitive. Option: `' + opts.assignee + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'milestone' ) ) {
		opts.milestone = options.milestone;
		if ( !isPositiveInteger( opts.milestone ) ) {
			return new TypeError( 'invalid option. `milestone` option must be a positive integer. Option: `' + opts.milestone + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'labels' ) ) {
		opts.labels = options.labels;
		if ( !isStringArray( opts.labels ) ) {
			return new TypeError( 'invalid option. `labels` option must be a string array. Option: `' + opts.labels + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'useragent' ) ) {
		opts.useragent = options.useragent;
		if ( !isString( opts.useragent ) ) {
			return new TypeError( 'invalid option. `useragent` option must be a string primitive. Option: `' + opts.useragent + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
