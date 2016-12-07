'use strict';

// MODULES //

var tape = require( 'tape' );
var data = require( './../lib/data.js' );


// FUNCTIONS //

function setup() {
	return {
		'title': 'Big bug.'
	};
}


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof data, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a string', function test( t ) {
	t.equal( typeof data( 'Big bug', setup() ), 'string', 'returns a string' );
	t.end();
});

tape( 'the function sets the `title` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	out = data( 'Big bug.', opts );
	out = JSON.parse( out );

	t.deepEqual( out.title, opts.title, 'sets the `title` field' );
	t.end();
});

tape( 'the function sets the `body` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	opts.body = 'Beep boop.';

	out = data( 'Big bug', opts );
	out = JSON.parse( out );

	t.equal( out.body, opts.body, 'sets the `body` field' );
	t.end();
});

tape( 'the function sets the `assignees` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	opts.assignees = ['kgryte'];

	out = data( 'Big bug', opts );
	out = JSON.parse( out );

	t.deepEqual( out.assignees, opts.assignees, 'sets the `assignees` field' );
	t.end();
});

tape( 'the function sets the `milestone` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	opts.milestone = 123;

	out = data( 'Big bug', opts );
	out = JSON.parse( out );

	t.equal( out.milestone, opts.milestone, 'sets the `milestone` field' );
	t.end();
});

tape( 'the function sets the `labels` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	opts.labels = ['beep','boop','bop'];

	out = data( 'Big bug', opts );
	out = JSON.parse( out );

	t.deepEqual( out.labels, opts.labels, 'sets the `labels` field' );
	t.end();
});
