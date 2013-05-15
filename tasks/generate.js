/*
 * grunt-generate
 * https://github.com/grunt-generate/grunt-generate
 *
 * Copyright (c) 2013 Camille Reynders, Cedric Dugas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.registerMultiTask('generate', 'Generator for user-defined templates', function(templatePathRaw,destinationPathRaw) {
      var defaultSrc = __dirname+"/../templates";
      var options = this.options({
          dest : 'app/scripts',
          src: defaultSrc,
          extension: '.js'
      });
      var framework = this.target;
      var destinationParts = destinationPathRaw.split('/');
      var translatedParts = templatePathRaw.split('/');
      if( options.map ){
          translatedParts = translatedParts.map(function(part){
              return (options.map[part])
                ? options.map[part]
                : part;
          });
          translatedParts = translatedParts.join('/').split('/');
      }
      var type = translatedParts.pop();
      var wildcardIndex = destinationParts.indexOf('*');
      if( wildcardIndex>-1)
          destinationParts[wildcardIndex]=translatedParts.join('/');
      destinationParts.unshift(options.dest);
      var fileName = destinationParts[destinationParts.length-1];
      options.className = grunt.util._.classify(fileName);
      options.package = [grunt.util._.camelize(options.appName)].concat(translatedParts).join('.');
      options.type = type;
      options.fqn = grunt.util._.join('.',options.package, options.className);
      options.baseName = fileName + options.extension;
      var destinationPath = destinationParts.join('/') + options.extension;
      var sourcePath = grunt.util._.join('/', options.src, framework, templatePathRaw) + options.extension;
      if( ! grunt.file.exists(sourcePath))
          sourcePath = grunt.util._.join('/', defaultSrc, framework, templatePathRaw) + options.extension;
      var templateFile = grunt.file.read(sourcePath);
      grunt.verbose.writeln('Options:', options);
      grunt.verbose.writeln("Read:", sourcePath);
      var fileContent = grunt.template.process(templateFile,{data:options});
      //grunt.file.write(destinationPath, fileContent);
      grunt.log.writeln('Generated:', destinationPath);
  });

};
