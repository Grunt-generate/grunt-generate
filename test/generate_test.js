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

var defaultArgs = ['--gruntfile', 'test/fixtures/Gruntfile.js', '--no-color'];
module.exports = {
  'should throw error when called without arguments' : function( test ){
    grunt.util.spawn( {
      grunt : true,
      args  : ['generate'].concat( defaultArgs )
    }, function( err,
                 result ){
      test.expect( 2 );
      test.ok( expect( result.stdout ).to.contain( 'requires exactly 2 task arguments' ) );
      test.ok( expect( err ).not.to.be.undefined );
      test.done();
    } );
  },

  'should throw error when called with one argument' : function( test ){
    grunt.util.spawn( {
      grunt : true,
      args  : ['generate:foo'].concat( defaultArgs )
    }, function( err,
                 result ){
      test.expect( 2 );
      test.ok( expect( result.stdout ).to.contain( 'requires exactly 2 task arguments' ) );
      test.ok( expect( err ).not.to.be.undefined );
      test.done();
    } );
  },

  'should generate a file w/o path' : function( test ){
    grunt.util.spawn( {
      grunt : true,
      args  : ['generate:mapping/Module:ModuleStub'].concat( defaultArgs )
    }, function( err,
                 result ){
      err && test.fail( result.stdout );
      test.expect( 1 );
      test.ok( grunt.file.exists( 'test/fixtures/generated/dest/mapped/ModuleStub.js' ) );
      test.done();
    } );
  },

  'should generate a file with path' : function( test ){
    grunt.util.spawn( {
      grunt : true,
      args  : ['generate:mapping/Module:ModuleStub@feature'].concat( defaultArgs )
    }, function( err,
                 result ){
      err && test.fail( result.stdout );
      test.expect( 1 );
      test.ok( grunt.file.exists( 'test/fixtures/generated/dest/mapped/feature/ModuleStub.js' ) );
      test.done();
    } );
  },

  'should allow overriding the default dest in the mapping' : function( test ){
    grunt.util.spawn( {
      grunt : true,
      args  : ['generate:override/Module:ModuleStub'].concat( defaultArgs )
    }, function( err,
                 result ){
      err && test.fail( result.stdout );
      test.expect( 1 );
      test.ok( grunt.file.exists( 'test/fixtures/generated/overridden/mapped/ModuleStub.js' ) );
      test.done();
    } );
  },

  'should allow overriding the default dest in the argument' : function( test ){
    grunt.util.spawn( {
      grunt : true,
      args  : ['generate:mapping/Module:ModuleStub@/generated/overridden/argumented'].concat( defaultArgs )
    }, function( err,
                 result ){
      err && test.fail( result.stdout );
      test.expect( 1 );
      test.ok( grunt.file.exists( 'test/fixtures/generated/overridden/argumented/ModuleStub.js' ) );
      test.done();
    } );
  },

  'should allow overriding a mapping with a file-specific mapping' : function( test ){
    grunt.util.spawn( {
      grunt : true,
      args  : ['generate:override/ExtraModule:ModuleStub'].concat( defaultArgs )
    }, function( err,
                 result ){
      err && test.fail( result.stdout );
      test.expect( 1 );
      test.ok( grunt.file.exists( 'test/fixtures/generated/dest/overridden/ModuleStub.js' ) );
      test.done();
    } );
  },

  'should allow constructing a path' : function( test ){
    grunt.util.spawn( {
      grunt : true,
      args  : ['generate:constructed/Module:ModuleStub@feature'].concat( defaultArgs )
    }, function( err,
                 result ){
      err && test.fail( result.stdout );
      test.expect( 1 );
      test.ok( grunt.file.exists( 'test/fixtures/generated/dest/feature/constructed/ModuleStub.js' ) );
      test.done();
    } );
  },

  'should allow constructing a path with file' : function( test ){
    grunt.util.spawn( {
      grunt : true,
      args  : ['generate:constructed/ExtraModule:Module@feature'].concat( defaultArgs )
    }, function( err,
                 result ){
      err && test.fail( result.stdout );
      test.expect( 1 );
      test.ok( grunt.file.exists( 'test/fixtures/generated/dest/feature/constructed/stub_Module.js' ) );
      test.done();
    } );
  },

  'should throw error when template file not found' : function( test ){
    grunt.util.spawn( {
      grunt : true,
      args  : ['generate:undefined:undefined'].concat( defaultArgs )
    }, function( err,
                 result ){
      test.expect( 2 );
      test.ok( expect( result.stdout ).to.contain( 'No template files match' ) );
      test.ok( expect( err ).not.to.be.undefined );
      test.done();
    } );
  },

  'should expose grunt config to templates': function (test) {
    grunt.util.spawn({
      grunt: true,
      args: ['generate:interpolate/fileWithGruntConfig:file'].concat(defaultArgs)
    }, function (err, result) {
      err && test.fail(result.stdout);
      test.expect( 2 );
      test.ok( expect(
        grunt.file.read( 'test/fixtures/generated/dest/interpolated/file.js' )
      ).to.contain( 'templates' ));
      test.ok( expect(
        grunt.file.read( 'test/fixtures/generated/dest/interpolated/file.js' )
      ).to.contain( 'generated/dest' ));
      test.done();
    });
  }
};