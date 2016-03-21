'use strict';

// MODULES //

var tape = require( 'tape' );
var createIssue = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof createIssue, 'function', 'main export is a function' );
	t.end();
});

tape( 'module exports a factory method', function test( t ) {
	t.equal( typeof createIssue.factory, 'function', 'export includes a factory method' );
	t.end();
});
