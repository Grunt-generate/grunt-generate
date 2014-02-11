# grunt-generate [![GitHub version](https://badge.fury.io/gh/Grunt-generate%2Fgrunt-generate.png)](http://badge.fury.io/gh/Grunt-generate%2Fgrunt-generate)

> Grunt plugin that generates files from user-defined templates. It follows the DFGIMW mantra (don't fucking get in my way).

It doesn't aim to replace grunt-init or Yo, but rather complement it.
Yo generators are cool, but restricting. This task allows you to very easily and extremely fast set up your own templates and start using them right away.

When you run the task it basically looks for a specified template, processes it and uses it to generate a file right into your application structure.
The real benefits are that the task is highly configurable and allows you to create files from templates of your own making (there are some pre-defined ones though)
into a structure you have decided upon.

This grunt task is a derivative/enhancement of the [backbone_generate](https://github.com/posabsolute/backbone_generate) grunt task.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-generate --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-generate');
```

## The "generate" task

### Overview

Some pre-defined templates are shipped with grunt-generate, **let's take a look how you would start using the _backbone_ templates**.

In your project's Gruntfile, add a section named `generate` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  generate: {
    options: {
        appName: 'MyAwesomeApp' //this is the only required one
    },
    backbone:{
      options:{
        map:{
          View: 'views/View',
          Model: 'models/Model',
          Collection: 'collections/Collection',
          Router: 'routers/Router'
        }
      }
    }
  },
})
```

### General options

#### appName
Type: `String`

Requires, is used to determine the package

#### src
Type: `String`
Default: '<grunt-generate>/templates'

Path to the source templates directory. Do not end this with a `/` (slash).
Relative to the Gruntfile.

#### dest
Type: `String`
Default: 'app/scripts'

Path to the destination directory. Do not end this with a `/` (slash).
Relative to the Gruntfile.

#### extension
Type: `String`
Default: '.js'

The extension of the files. This allows you to use grunt-generate with other types of files than JavaScript only.

### Usage Examples

The typical command would be:
```shell
  grunt generate:backbone:Model:*/FooModel
```

This will take the template `Model.js` inside the `templates` directory of the grunt-generate task, process it and output to a file
`app/scripts/models/FooModel.js`

### Template path and filename mappings

You can define mappings for all parts of your template paths to be resolved into a different directory structure in your application directory.

For instance, this is our Grunt config, specifically for Backbone:

```js
    backbone:{
      options:{
        map:{
          View: 'views/View',
          Model: 'models/Model',
          Collection: 'collections/Collection',
          Router: 'routers/Router'
        }
      }
    }
```

When the task is run with `View` as a parameter, like this:

```shell
  grunt generate:backbone:View:*/FooView
```

The wildcard character `*` (asterisk) is automatically substituted by the mapping in the config.
E.g. if our config is this:

```js
    backbone:{
      options:{
        map:{
          View: 'ui/View'
        }
      }
    }
```
Then `FooView` will be generated inside a `ui` directory instead.

### Using your own templates

The whole idea however is that you can easily use your own templates instead of the predefined ones.

1. Just drop a template (e.g. `Bar.js`) inside a directory of your own choosing, e.g. `templates`
1. Configure the task:

  ```js
    grunt.initConfig({
    generate: {
      options: {
        appName: 'MyAwesomeApp',
        src: 'templates',
        map:{
          Bar: 'baz/Bar'
        }
      }
    }
  ```
1. run the task
  ```shell
  grunt generate:Bar:Qux
  ```

  a file `app/scripts/baz/Qux.js` will be generated from the `Bar` template.

#### Inside the templates

You can write whatever you want obviously. **Grunt is automatically exposed, so you have access to the full Grunt API**.
And also **all of your task-specific options are exposed as variables**.
E.g. you can access the application name with `appName`.

There are a few special variables:

* `className`: the name of the class as passed as a parameter, in the above example this would be 'Qux'.
* `package`: an autogenerated package, constructed from the appName and the directory structure, e.g. 'myAwesomeApp.baz'.
* `type`: The template used, e.g. 'Bar'
* `fqn` : The fully qualifued name, e.g. 'myAwesomeApp.baz.Qux'
* `baseName` : the basename of the file, e.g. 'Qux.js'

An overview of all variables and their values will be shown if you run the task with `--verbose`.


### Convoluted example, just for the heck of it

An example to show how configurable the task is.

Let's say you're using 'Backbone.Marionette' in your application. You have templates for the Backbone classes and templates for Marionette classes and your app resides in a `src/js` directory.
Since everything is configurable you can choose whatever structure you want for your templates directory, let's assume we have these two template files:

```
templ/bb/Model.js
templ/m/views/ItemView.js 
```

And your config would look like this:

```js
  grunt.initConfig({
  generate: {
    options: {
      appName: 'KillerApp',
      src: 'templ',
      dest: 'src/js'
    },

    //this MUST be the directory name of your backbone templates
    bb:{ 
      options:{
        map: {
          Model: 'data/Model'
        }
      }
    },

    //this MUST be the directory name of your marionette templates
    m:{
      options:{
        map:{
          views: 'ui'
        }
      }
    }
  }
```

Let's further assume you like to separate your app by functionality and we're working on an editor, then the following command:

```shell
grunt generate:bb:Model:editor/*/FooModel
```

Will use `templ/bb/Model.js` to generate a file `src/js/editor/data/FooModel.js`

and

```shell
grunt generate:m:views/ItemView:core/*/MainView
```

will use `templ/m/views/ItemView.js` to generate a file `src/js/core/ui/MainView.js`



## Contributing

**We'd like to provide some more pre-defined templates, since people can use them as a starting point for their own templates. If you happen to have some lying around we'd be very happy to add them.**

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


