'use strict';

// MODULES //

var debug = require( 'debug' )( 'github-create-issue:data' );


// MAIN //

/**
* Extracts data to be posted to a remote endpoint.
*
* @private
* @param {string} title - issue title
* @param {string} [opts.body] - issue content
* @param {Array<string>} [opts.assignees] - GitHub usernames of assigned users
* @param {number} [opts.milestone] - number of associated milestone
* @param {Array<string>} [opts.labels] - issue labels
* @returns {string} data to post
*/
function data( title, opts ) {
	var out = {};

	out.title = title;
	debug( 'Issue title: %s', title );

	if ( opts.body ) {
		out.body = opts.body;
		debug( 'Issue body: %s', opts.body );
	}
	if ( opts.assignees ) {
		out.assignees = opts.assignees;
		debug( 'Assigned users: %s', opts.assignees.join( ',' ) );
	}
	if ( opts.milestone ) {
		out.milestone = opts.milestone;
		debug( 'Milestone: %d', opts.milestone );
	}
	if ( opts.labels ) {
		out.labels = opts.labels;
		debug( 'Labels: %s', opts.labels.join( ',' ) );
	}
	return JSON.stringify( out );
} // end FUNCTION data()


// EXPORTS //

module.exports = data;
