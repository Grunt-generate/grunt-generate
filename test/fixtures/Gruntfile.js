/*
 * grunt-generate
 * https://github.com/grunt-generate/grunt-generate
 *
 * Copyright (c) 2013 Camille Reynders, Cedric Dugas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ){

  // Project configuration.
  grunt.initConfig( {
    generate : {
      options : {
        src : 'templates',
        dest : 'generated/dest',
        map : {
          "mapping" : "mapped",
          "override" : '/generated/overridden/mapped',
          "override/ExtraModule" : 'overridden',
          "constructed" : ':dir/constructed',
          "constructed/ExtraModule" : ':dir/constructed/stub_:basename'
        }
      }
    }
  } );

  // Actually load this plugin's task(s).
  grunt.loadTasks( '../../tasks' );
};
