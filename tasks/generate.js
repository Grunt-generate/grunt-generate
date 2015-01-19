/*
 * grunt-generate
 * https://github.com/grunt-generate/grunt-generate
 *
 * Copyright (c) 2013 Camille Reynders, Cedric Dugas
 * Licensed under the MIT license.
 */

'use strict';

var path = require( 'path' );
var _ = require( 'lodash' );
var _s = require( 'underscore.string' );
var inquirer = require( 'inquirer' );
var pathCompleteExtname = require('path-complete-extname');

module.exports = function( grunt ){

  grunt.registerTask( 'generate', 'Generator for user-defined templates', function(){
    if( 2 !== this.args.length ){
      grunt.fail.fatal( new Error( 'Generate task requires exactly 2 task arguments, e.g. "generate:backbone/Model:AuthModel@login".' ) );
    }

    var done = this.async();

    function finalize( destination,
                       data ){
      if( !grunt.file.exists( destination.absolute ) ){
        grunt.file.write( destination.absolute, data );
        return done( true );
      }

      return grunt.fail.fatal( new Error( 'file already exists: ' + destination.relative ) );
    }

    var options = this.options( {
      src    : "templates",
      dest   : '',
      map    : {},
      prompt : true
    } );

    var source = {
      path : this.args[0]
    };
    source.pattern = path.join( options.src, source.path + '.*' );

    var destArgs = this.args[1].split( '@' );
    var destination = {
      name : destArgs.shift(),
      dir  : destArgs.shift() || ''
    };

    var patterns = [
      source.pattern,
      path.join( __dirname, '..', 'templates', source.path + '.*' )
    ];
    var files = grunt.file.expand( patterns );

    if( files.length <= 0 ){
      grunt.fail.fatal( new Error( 'No template files match "' + source.path + '".' ) );
    }

    source.relative = files[0];
    source.absolute = path.resolve( source.relative );
    source.ext = pathCompleteExtname( source.relative );
    destination.basename = destination.name + source.ext;

    var mapping;
    var sourcePathParts = source.path.split( '/' );
    findMapping : while( sourcePathParts.length > 0 ){
      mapping = options.map[sourcePathParts.join( '/' )];
      if( mapping ){
        break findMapping;
      }
      sourcePathParts.pop();
    }

    if( '/' === destination.dir.charAt( 0 ) ){
      destination.dir = destination.dir.substr( 1 );
      destination.template = ':dir/:basename';
    }else{
      if( !mapping ){
        destination.template = options.dest;
      }else{
        if( '/' === mapping.charAt( 0 ) ){
          destination.template = mapping.substr( 1 ); //drop '/' at beginning
        }else{
          destination.template = path.join( options.dest, mapping );
        }
      }
    }

    if( 0 > destination.template.indexOf( ':basename' ) ){
      if( 0 > destination.template.indexOf( ':dir' ) ){
        destination.template = path.join( destination.template, ':dir' );
      }
      destination.template = path.join( destination.template, ':basename' );
    }

    destination.relative = path.join( destination.template
      .replace( ':dir', destination.dir )
      .replace( ':basename', destination.basename ) );

    destination.absolute = path.resolve( destination.relative );
    destination.path = destination.relative.replace( '/' + destination.basename, '' );
    var data = _.extend( {
      file : destination,
      meta : {
        className : _s.classify( destination.name ),
        type      : source.path.replace( '/', '.' ),
        package   : _s.camelize( destination.dir.replace( '/', '.', 'g' ) )
      }
    }, grunt.config.data );
    data.meta.fqn = data.meta.package + '.' + data.meta.className;

    var processed = grunt.template.process( grunt.file.read( source.absolute ), {
      data : data
    } );

    grunt.verbose.writeln( 'Template data:'.cyan, '\n', data );
    grunt.verbose.writeln( 'File contents:'.cyan, '\n', processed );

    if( options.prompt ){
      inquirer.prompt( [
        {
          type    : "confirm",
          message : "Are you sure you want to create '" + destination.relative + "'?",
          name    : "confirmed",
          default : true
        }
      ], function( answers ){
        if( answers.confirmed ){
          return finalize( destination, processed );
        }else{
          return done( false );
        }
      } );
    }else{
      return finalize( destination, processed );
    }

  } );

};
