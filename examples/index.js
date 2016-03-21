'use strict';

var createIssue = require( './../lib' );

var opts = {
	'token': '<your_token_goes_here>',
	'useragent': 'beep-boop-bop',
	'body': 'Beep boop.'
};

createIssue( 'kgryte/test-repo1', 'Big bug.', opts, clbk );

function clbk( error, issue, info ) {
	if ( info ) {
		console.error( info );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( issue );
}
