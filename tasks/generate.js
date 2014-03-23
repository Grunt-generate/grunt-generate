/*
 * grunt-generate
 * https://github.com/grunt-generate/grunt-generate
 *
 * Copyright (c) 2013 Camille Reynders, Cedric Dugas
 * Licensed under the MIT license.
 */

'use strict';

var path = require( 'path' );
var glob = require( 'glob' );
var _s = require( 'underscore.string' );

module.exports = function( grunt ){
  grunt.registerTask( 'generate', 'Generator for user-defined templates', function(){
    if( 2 !== this.args.length ){
      grunt.fail.fatal( new Error( 'Generate task requires exactly 2 task arguments, e.g. "generate:backbone/Model:AuthModel@login".' ) );
    }

    var done = this.async();

    var options = this.options( {
      src : "templates",
      dest : '',
      map : {}
    } );

    var source = {
      path : this.args[0]
    };
    source.pattern = options.src + '/' + source.path + '.*';

    var destArgs = this.args[1].split( '@' );
    var destination = {
      name      : destArgs.shift(),
      directory : destArgs.shift() || ''
    };

    glob( source.pattern, function( err,
                                    files ){
      if( err ){
        return done( err );
      }
      if( files.length <= 0 ){
        grunt.fail.fatal( new Error( 'No template files match "' + source.path + '".' ) );
      }
      if( files.length > 1 ){
        grunt.fail.fatal( new Error( 'Ambiguous reference to template file: "' + source.path + '".' ) );
      }

      source.relative = files[0];
      source.absolute = path.resolve( source.relative );
      source.ext = path.extname( source.relative );
      destination.basename = destination.name + source.ext;

      var mapping;
      var sourcePathParts = source.path.split('/');
      findMapping : while(sourcePathParts.length > 0){
        mapping = options.map[sourcePathParts.join('/')]
        if( mapping ){
          break findMapping;
        }
        sourcePathParts.pop();
      }

      if( '/' === destination.directory.charAt(0)){
        destination.directory = destination.directory.substr(1);
        destination.template = ':path/:file';
      }else{
        if(! mapping){
          destination.template = options.dest;
        }else{
          if('/' === mapping.charAt(0)){
            destination.template = mapping.substr(1); //drop '/' at beginning
          }else{
            destination.template = path.join(options.dest, mapping);
          }
        }
      }

      if(0 > destination.template.indexOf(':file')){
        if(0 > destination.template.indexOf(':path')){
          destination.template = path.join(destination.template, ':path');
        }
        destination.template = path.join(destination.template, ':file');
      }

      destination.relative = path.join(destination.template
          .replace(':path', destination.directory )
          .replace(':file', destination.basename));

      destination.absolute = path.resolve( destination.relative );
      destination.path = destination.relative.replace( '/' + destination.basename, '' );
      var data = {
        file : destination,
        meta : {
          className : _s.classify( destination.name ),
          type      : source.path.replace( '/', '.' ),
          package   : _s.camelize( destination.directory.replace('/', '.', 'g') )
        }
      };
      data.meta.fqn = data.meta.package + '.' + data.meta.className;

      var processed = grunt.template.process( grunt.file.read( source.absolute ), {
        data : data
      } );

      grunt.verbose.writeln( 'Template data:'.cyan, '\n', data );
      grunt.verbose.writeln( 'File contents:'.cyan, '\n', processed );

      grunt.file.write( destination.absolute, processed );

      return done( true );
    }.bind( this ) );
  } );

};
