/*
 * grunt-bc-scaffold
 * https://github.com/posabsolute/bc-scaffold
 *
 * Copyright (c) 2013 Cedric Dugas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('bb_generate', 'Generators for backbone.js.', function(name, path) {
    // Merge task-specific and/or target-specific options with these defaults.
    var defaults =  this.options({ appsrc:"app/scripts/"});

    var options = this.options({
      routersrc:    defaults.appsrc +"routers/",
      modelsrc:     defaults.appsrc +"models/",
      viewsrc:      defaults.appsrc +"views/",
      collectionsrc:defaults.appsrc +"collections/",
      templatesrc:  defaults.appsrc +"templates/"
    });

    var content = {
      appname : options.appname,
      name : name
    }
    var src = (path) ? path : options[this.target+"src"];

    if(this.target === "router"){
      var tmpl = grunt.file.read(__dirname+"/../templates/router.js");
      grunt.file.write(src+name+".js", grunt.template.process(tmpl,{data:content}));
      grunt.log.writeln('Generated '+  name + ' router');
    }
    if(this.target === "model"){
      var tmpl = grunt.file.read(__dirname+"/../templates/model.js");
      grunt.file.write(src+name+"js", grunt.template.process(tmpl,{data:content}));
      grunt.log.writeln('Generated '+  name + ' model');
    }
    if(this.target === "view"){
      var tmpl = grunt.file.read(__dirname+"/../templates/view.js");
      grunt.file.write(src+name+".js", grunt.template.process(tmpl,{data:content}));
      grunt.log.writeln('viewsrc '+  name + ' view');
    }
      if(this.target === "template"){
      var tmpl = grunt.file.read(__dirname+"/../templates/template.html");
      grunt.file.write(src+name+".html", grunt.template.process(tmpl,{data:content}));
      grunt.log.writeln('Generated '+  name + ' template');
    }
    if(this.target === "collection"){
      var tmpl = grunt.file.read(__dirname+"/../templates/collection.js");
      grunt.file.write(src+name+".js", grunt.template.process(tmpl,{data:content}));
      grunt.log.writeln('Generated '+  name + ' collection');
    }
  });

};
