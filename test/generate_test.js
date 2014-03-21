'use strict';

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var grunt = require( 'grunt' );
var util = require( 'util' );
var task = require( '../tasks/generate' );
var expect = require( 'chai' ).expect;

module.exports = {
  'should throw error when called without arguments' : function( test ){
    grunt.util.spawn( {
      grunt : true,
      args  : ['generate']
    }, function( err,
                 result ){
      test.expect( 2 );
      test.ok( expect( result.stdout ).to.contain( 'requires exactly 2 arguments' ) );
      test.ok( expect( err ).not.to.be.undefined );
      test.done();
    } );
  },

  'should throw error when called with one argument' : function( test ){
    grunt.util.spawn( {
      grunt : true,
      args  : ['generate:foo']
    }, function( err,
                 result ){
      test.expect( 2 );
      test.ok( expect( result.stdout ).to.contain( 'requires exactly 2 arguments' ) );
      test.ok( expect( err ).not.to.be.undefined );
      test.done();
    } );
  },

  'should generate file at correct location' : function( test ){
    grunt.util.spawn( {
      grunt : true,
      args  : ['generate:backbone/Model:ModelStub@tests']
    }, function( err,
                 result ){
      err && console.log(result.stdout);
      test.expect( 1 );
      test.ok( grunt.file.exists( '.tmp/tests/ModelStub.js' ) );
      test.done();
    } );
  },

  'should throw error when template file not found' : function( test ){
    grunt.util.spawn( {
      grunt : true,
      args  : ['generate:undefined:undefined', '--no-color']
    }, function( err,
                 result ){
      test.expect( 2 );
      test.ok( expect( result.stdout ).to.contain( 'No template files match' ) );
      test.ok( expect( err ).not.to.be.undefined );
      test.done();
    } );
  },

  'should throw error when multiple template files match' : function( test ){
    grunt.util.spawn( {
      grunt : true,
      args  : ['generate:backbone/*:undefined', '--no-color']
    }, function( err,
                 result ){
      test.expect( 2 );
      test.ok( expect( result.stdout ).to.contain( 'Ambiguous reference to template file' ) );
      test.ok( expect( err ).not.to.be.undefined );
      test.done();
    } );
  }

};