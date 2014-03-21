module.exports = {
  "all"     : [
    "Gruntfile.js",
    "tasks/*.js",
    "<%= nodeunit.tests %>"
  ],
  "options" : {
    "jshintrc" : ".jshintrc",
    reporter   : require( 'jshint-stylish' )
  }
};