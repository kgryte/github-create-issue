'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var query = require( './../lib/query.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var data = require( './fixtures/results.json' );
var info = require( './fixtures/info.json' );
var response = {
	'headers': {
		'x-ratelimit-limit': info.limit.toString(),
		'x-ratelimit-remaining': info.remaining.toString(),
		'x-ratelimit-reset': info.reset.toString()
	}
};


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof query, 'function', 'export is a function' );
	t.end();
});

tape( 'function returns an error to a provided callback if an error is encountered when creating an issue (no rate limit info)', function test( t ) {
	var query;
	var opts;

	query = proxyquire( './../lib/query.js', {
		'./request.js': request
	});

	opts = getOpts();
	query( 'beep/boop', 'Big bug.', opts, done );

	function request( opts, data, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ) );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

tape( 'function returns an error to a provided callback if an error is encountered when creating an issue (rate limit info)', function test( t ) {
	var query;
	var opts;

	query = proxyquire( './../lib/query.js', {
		'./request.js': request
	});

	opts = getOpts();
	query( 'beep/boop', 'Big bug.', opts, done );

	function request( opts, data, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ), response );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

tape( 'function returns response data to a provided callback', function test( t ) {
	var expected;
	var query;
	var opts;

	query = proxyquire( './../lib/query.js', {
		'./request.js': request
	});

	expected = data;

	opts = getOpts();
	query( 'beep/boop', 'Big bug.', opts, done );

	function request( opts, body, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, response, data );
		}
	}

	function done( error, data ) {
		t.deepEqual( data, expected, 'deep equal' );
		t.end();
	}
});

tape( 'function returns rate limit info to a provided callback', function test( t ) {
	var expected;
	var query;
	var opts;

	query = proxyquire( './../lib/query.js', {
		'./request.js': request
	});

	expected = info;

	opts = getOpts();
	query( 'beep/boop', 'Big bug.', opts, done );

	function request( opts, body, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, response, data );
		}
	}

	function done( error, data, info ) {
		t.deepEqual( info, expected, 'deep equal' );
		t.end();
	}
});

tape( 'function returns rate limit info to a provided callback (error)', function test( t ) {
	var expected;
	var query;
	var opts;

	query = proxyquire( './../lib/query.js', {
		'./request.js': request
	});

	expected = info;

	opts = getOpts();
	query( 'beep/boop', 'Big bug.', opts, done );

	function request( opts, body, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ), response );
		}
	}

	function done( error, data, info ) {
		t.ok( error, 'returns an error' );
		t.equal( data, null, 'no data' );

		t.deepEqual( info, expected, 'deep equal' );

		t.end();
	}
});
