## Examples

We have a `templates/backbone/View.js` and `templates/grunt/taskConfig.js` file.

### With `dest`

```js
generate : {
	options : {
		dest : "app/scripts"
	}
}
```
```shell
grunt generate:backbone/View:TestView
#creates file '<project>/app/scripts/TestView.js'

grunt generate:backbone/View:TestView@login/views
#creates file '<project>/app/scripts/login/views/TestView.js'

#note the / before 'config', it tells the task to override `dest`
grunt generate:grunt/taskConfig:jshint@/config
#creates file '<project>/config/jshint.js'
```

### With directory mapping

```js
generate : {
	options : {
		dest : "app/scripts"
		map : {
			grunt: "/config" //note the / before `config`, it tells the task to override `dest`
		}
	}
}
```
```shell
grunt generate:grunt/taskConfig:jshint
#creates file '<project>/config/jshint.js'

grunt generate:grunt/taskConfig:jshint@tasks
#creates file '<project>/config/tasks/jshint.js'
```

### With file mapping

```js
generate : {
	options : {
		default : "app/scripts"
		map : {
			"backbone/View" : "views" //no "/" which means views will be generated in `app/scripts/views`
		}
	}
}
```
```shell
grunt generate:backbone/View:TestView
#creates file '<project>/app/scripts/views/TestView.js'

grunt generate:backbone/View:TestView@login
#creates file '<project>/app/scripts/views/login/TestView.js'
```

### With templating

```js
generate : {
	options : {
		default : "app/scripts"
		map : {
			"backbone/View" : ":dir/ui/views"
			"grunt" : "/build/config-:basename"
		}
	}
}
```
```shell
grunt generate:backbone/View:TestView
#creates file '<project>/app/scripts/ui/views/TestView.js'

grunt generate:backbone/View:TestView@login
#creates file '<project>/app/scripts/login/ui/views/TestView.js'

grunt generate:grunt/taskConfig:lint
#creates files '<project>/build/config-lint.js'
```

