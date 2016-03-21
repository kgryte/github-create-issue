Create Issue
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Create][github-create-issue] an issue on a Github repository.


## Installation

``` bash
$ npm install github-create-issue
```


## Usage

``` javascript
var createIssue = require( 'github-create-issue' );
```

<a name="create-issue"></a>
#### createIssue( slug, title, options, clbk )

[Creates][github-create-issue] an issue on a Github repository.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!'
};

createIssue( 'kgryte/test-repo1', 'Big bug.', opts, clbk );

function clbk( error, issue, info ) {
	// Check for rate limit information...
	if ( info ) {
		console.error( 'Limit: %d', info.limit );
		console.error( 'Remaining: %d', info.remaining );
		console.error( 'Reset: %s', (new Date( info.reset*1000 )).toISOString() );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( JSON.stringify( issue ) );
	// returns <issue_data>
}
```

The `function` accepts the following `options`:
*   __token__: Github [access token][github-token] (*required*).
*   __useragent__: [user agent][github-user-agent] `string`.
*   __body__: issue content.
*   __assignee__: Github username to which the issue should be assigned.
*   __milestone__: number of associated milestone.
*   __labels__: `array` of associated labels.


To [authenticate][github-oauth2] with Github, set the [`token`][github-token] option.

``` javascript
var opts = {
    'token': 'tkjorjk34ek3nj4!'
};

createIssue( 'kgryte/test-repo1', 'Big bug.', opts, clbk );
```

To specify a [user agent][github-user-agent], set the `useragent` option.

``` javascript
var opts = {
    'token': 'tkjorjk34ek3nj4!',
    'useragent': 'hello-github!'
};

createIssue( 'kgryte/test-repo1', 'Big bug.', opts, clbk );
```


## Notes

*	[Rate limit][github-rate-limit] information includes the following:
	-	__limit__: maximum number of requests a consumer is permitted to make per hour.
	-	__remaining__: number of remaining requests.
	-	__reset__: time at which the current [rate limit][github-rate-limit] window resets in [UTC seconds][unix-time].


---
## Examples

``` javascript

var opts = {
    'token': 'tkjorjk34ek3nj4!',
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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

__Note__: in order to run the example, you will need to obtain an access [token][github-token] with appropriate permissions and modify the `token` option accordingly.


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g github-create-issue
```


### Usage

``` bash
Usage: ghcreateissue [options] slug

Options:

  -h,  --help                      Print this message.
  -V,  --version                   Print the package version.
       --token token               Github access token.
  -ua, --useragent ua              User agent.
       --title title               Issue title.
       --body content              Issue content.
       --assignee username         Github username of assigned user.
       --milestone number          Number of associated milestone.
       --labels label1,label2,...  Issue labels.
```


### Notes

*   In addition to the [`token`][github-token] option, the [token][github-token] may also be specified by a [`GITHUB_TOKEN`][github-token] environment variable. The command-line option __always__ takes precedence.
*   Issue information is written to `stdout`.
*   [Rate limit][github-rate-limit] information is written to `stderr`.


### Examples

Setting the access [token][github-token] using the command-line option:

``` bash
$ DEBUG=* ghcreateissue beep/boop --title 'Big bug.' --token <token> 
# => '{...}'
```

Setting the access [token][github-token] using an environment variable:

``` bash
$ DEBUG=* GITHUB_TOKEN=<token> ghcreateissue beep/boop --title 'Big bug.'
# => '{...}'
```

For local installations, modify the command to point to the local installation directory; e.g., 

``` bash
$ DEBUG=* ./node_modules/.bin/ghcreateissue beep/boop --title 'Big bug.' --token <token>
# => '{...}'
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ DEBUG=* node ./bin/cli beep/boop --title 'Big bug.' --token <token>
# => '{...}'
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/github-create-issue.svg
[npm-url]: https://npmjs.org/package/github-create-issue

[build-image]: http://img.shields.io/travis/kgryte/github-create-issue/master.svg
[build-url]: https://travis-ci.org/kgryte/github-create-issue

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/github-create-issue/master.svg
[coverage-url]: https://codecov.io/github/kgryte/github-create-issue?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/github-create-issue.svg
[dependencies-url]: https://david-dm.org/kgryte/github-create-issue

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/github-create-issue.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/github-create-issue

[github-issues-image]: http://img.shields.io/github/issues/kgryte/github-create-issue.svg
[github-issues-url]: https://github.com/kgryte/github-create-issue/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[unix-time]: http://en.wikipedia.org/wiki/Unix_time

[github-api]: https://developer.github.com/v3/
[github-token]: https://github.com/settings/tokens/new
[github-oauth2]: https://developer.github.com/v3/#oauth2-token-sent-in-a-header
[github-user-agent]: https://developer.github.com/v3/#user-agent-required
[github-rate-limit]: https://developer.github.com/v3/rate_limit/
[github-create-issue]: https://developer.github.com/v3/issues/#create-an-issue
