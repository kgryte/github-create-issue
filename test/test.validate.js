'use strict';

// MODULES //

var tape = require( 'tape' );
var validate = require( './../lib/validate.js' );


// TESTS //

tape( 'file exports a validation function', function test( t ) {
	t.equal( typeof validate, 'function', 'file exports a function' );
	t.end();
});

tape( 'if an options argument is not an object, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, values[i] );
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `token` option which is not a primitive string, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'token': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'a `token` option is required', function test( t ) {
	var err = validate( {}, {} );
	t.ok( err instanceof TypeError, 'a token option is required' );
	t.end();
});

tape( 'if provided a `body` option which is not a primitive string, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'token': 'abcdefg12345678',
			'body': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided an `assignee` option which is not a primitive string, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'token': 'abcdefg12345678',
			'assignee': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `milestone` option which is not a positive integer, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		-5,
		3.14,
		0,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'token': 'abcdefg12345678',
			'milestone': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `useragent` option which is not a primitive string, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'token': 'abcdefg12345678',
			'useragent': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `labels` option which is not a string array, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		['beep',null],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'token': 'abcdefg12345678',
			'labels': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'the function returns `null` if all options are valid', function test( t ) {
	var options;
	var opts;
	var err;

	options = {
		'token': 'abcdefg12345678',
		'useragent': 'beeper-booper',
		'body': 'beep boop',
		'assignee': 'kgryte',
		'milestone': 123,
		'labels': ['beep','boop','bop']
	};

	opts = {};
	err = validate( opts, options );

	t.equal( err, null, 'returns null' );
	t.deepEqual( opts, options, 'sets all options' );

	t.end();
});

tape( 'the function will ignore unrecognized options', function test( t ) {
	var err;

	err = validate( {}, {
		'token': 'abcdefg12345678',
		'beep': 'boop',
		'a': 5,
		'b': null,
		'c': 'woot'
	});
	t.equal( err, null, 'returns null' );

	t.end();
});
