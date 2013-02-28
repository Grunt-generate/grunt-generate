# grunt-bb-generate

Grunt plugin that scaffold backbone generators. It follows the DFGIMW mantra (don't fucking get in my way). It aims at be easily modifiable to fit any architecture being backbone or others.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bb-generate --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bb-generate');
```

## The "bb_generate" task

### Overview
In your project's Gruntfile, add a section named `bb_generate` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bb_generate: {
    options: {

    },
    router:{},
    view:{},
    collection:{},
    model:{},
    template:{},
  },
})
```

#### Options
Possible options include what is below, the path shown are the defaults app included in the plugin.

```js
  appname       : "Your app",
  appsrc        : "app/scripts/"
  routersrc     : "routers/",
  modelsrc      : "models/",
  viewsrc       : "views/",
  collectionsrc : "collections/",
  templatesrc   : "templates/"
```

### Usage Examples

The typical command would be:
```js
  grunt bb_generate:router:name
```

With the detault options that would generate a router (name.js) in the folder "app/scripts/routers"

Because apps do not always folder standars you can overwrite the path on the fly like this:
```js
  grunt bb_generate:router:name:mypath/to/router
```

### Bending it to your will

Just go into the templates folder and add/change the generators to fit your style.

After that go into tasks to bb_generate.js and add your new generators.

There is a very easy pattern to follow, you should get the gist pretty easily.


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


