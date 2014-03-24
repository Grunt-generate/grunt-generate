# grunt-generate

> Grunt plugin that generates files from user-defined templates.

It doesn't aim to replace grunt-init or Yo, but rather complement it.
Yo generators are cool, but opinionated. This task allows you to set up your own templates and start using them right away, organized any which way you want.

When you run the task it basically looks for a specified template, processes it and uses it to generate a file right into your project structure.
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

### v0.3

v0.3 introduces an entirely new API and is most definitely NOT backwards compatible. Compared to the previous versions it should be more clear, intuitive and save you some typing.

### Overview

Some pre-defined templates are shipped with grunt-generate, **let's take a look how you would start using the [pre-defined templates][predefined-templates]**.

We're going to use the template `templates/backbone/Model.js` and use it to generate `app/scripts/models/UserModel.js`.

#### Configuration

In your project's Gruntfile, add a section named `generate` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  generate: {
    options: {
      dest : 'app/scripts'
    }
  }
})
```

`dest` tells the task where to put the generated files by default.
Since most of our templates will be used in the application itself we allow them to be generated into `app/scripts`.

#### Usage

```shell
grunt generate:backbone/Model:UserModel@models
```

This will generate a file `app/scripts/models/UserModel` by processing the template `templates/backbone/Model.js`.

Et voila, you just scaffolded your very first file using `grunt-generate`.

### There's more

`grunt-generate` is simple to use yet pretty powerful. You can tell the task where to generate your files depending on what template you use, either by configuration or through task arguments.

Let's take a look how this is done.

#### Mapping directories

You can map template directories to destination directories, which means that any templates from a particular template directory will generate files into another specified directory.

Add the following to the above grunt configuration:

```js
grunt.initConfig({
  generate: {
    options: {
      dest : 'app/scripts',
      map : {
        nodeunit : '/test'
      }
    }
  }
});
```

If you run

```shell
grunt generate:nodeunit/test:test_foo
```

It will process the `nodeunit/test.js` template and generate a file `test_foo.js` into the `<project>/test` directory.
There's two things happening here:

1. We map everything coming from `nodeunit` to a `test` directory
1. We override the default `dest` by preceding our mapping destination with "/" (forward slash). It tells the task to forget whatever value `dest` has.

#### Mapping template files

You can also map specific template files to specific destinations.

```js
grunt.initConfig({
  generate: {
    options: {
      dest : 'app/scripts',
      map : {
        "backbone/View" : 'views'
      }
    }
  }
});
```

When we run

```shell
grunt generate:backbone/View:LoginView
```

It will generate a file `app/scripts/views/LoginView.js`.
Any file-specific mappings override directory mappings. For instance if we have this configuration:

```js
grunt.initConfig({
  generate: {
    options: {
      dest : 'app/scripts',
      map : {
        backbone : 'core'
        "backbone/View" : 'ui'
      }
    }
  }
});
```

It will generate all backbone files (`Collection`, `Model` and `Router`) inside `app/scripts/core`, except `View`s will be generated into `app/scripts/ui`.

#### Constructing more complex paths

More complex path structures can be created using the `:dir` variable inside destinations, it will be replaced with the path-part of your arguments, i.e. everything which follows "@" (at-sign).

For example:

```js
grunt.initConfig({
  generate: {
    options: {
      dest : 'app/scripts',
      map : {
        "backbone/View" : ':dir/views'
      }
    }
  }
});
```

Allows you to organize your files by domain, like this:

```shell
grunt generate:backbone/View:LoginView@user
```

This will generate `app/scripts/user/views/LoginView.js` file.

### Inside the templates

You can write whatever you want obviously. The templates are processed with [grunt.template](http://gruntjs.com/api/grunt.template) (i.e. they use [Lo-Dash templating](http://lodash.com/docs/#template))

**Grunt is automatically exposed, so you have access to the full Grunt API**.

There are a few special variables you can use however:

1. `file` contains all information on the generated file, e.g. for `generate:backbone/View:LoginView@user/views`

  ```js
  {
    name: 'LoginView',
    directory: 'user/views',
    basename: 'LoginView.js',
    template: '.tmp/:dir/:basename',
    relative: '.tmp/user/views/LoginView.js',
    absolute: '/Users/creynder/Dropbox/Work/Projects/grunt-generate/.tmp/user/views/LoginView.js',
    path: '.tmp/user/views'
  }
  ```

1. `meta` contains information that can be useful for class declarations:

  ```js
  {
    className: 'Loginview',
    type: 'backbone.View',
    package: 'user.views',
    fqn: 'user.views.Loginview'
  }
  ```

### Options

#### `src`

**Optional**

Type: `String`

Default: 'templates'

Path to the source templates directory. Do not end this with a `/` (slash).
Relative to the Gruntfile.

```js
grunt.initConfig({
  generate: {
    options: {
      src : 'templates'
    }
  }
});
```

#### `dest`

**Optional**

Type: `String`

Defines the default destination directory.

```js
grunt.initConfig({
  generate: {
    options: {
      dest : 'app/scripts'
    }
  }
});
```

#### `map`

**Optional**

Type : `Object`

Maps template directories to destination directories.

```js
grunt.initConfig({
  generate: {
    options: {
      map : {
        "backbone/View" : 'app/scripts/views'
      }
    }
  }
});

## Quick cheat sheet

[See some examples/a quick cheat sheet](https://github.com/Grunt-generate/grunt-generate/tree/master/CHEATSHEET.md)

## Contributing

**We'd like to provide some more pre-defined templates, since people can use them as a starting point for their own templates. If you happen to have some lying around we'd be very happy to add them.**

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


[predefined-templates]: https://github.com/Grunt-generate/grunt-generate/tree/master/templates