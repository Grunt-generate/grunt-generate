/*
 * grunt-generate
 * https://github.com/grunt-generate/grunt-generate
 *
 * Copyright (c) 2013 Camille Reynders, Cedric Dugas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ){

  require( 'time-grunt' )( grunt );
  require( 'jit-grunt' )( grunt );

  // Project configuration.
  grunt.initConfig( require( 'load-grunt-configs' )( grunt ) );

  // Actually load this plugin's task(s).
  grunt.loadTasks( 'tasks' );

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask( 'test', ['clean', 'nodeunit'] );

  // By default, lint and run all tests.
  grunt.registerTask( 'default', ['jshint', 'test'] );

};
