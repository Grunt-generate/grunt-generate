# Examples

We have a `templates/backbone/View.js` and `templates/grunt/config.js` file.

## With `default`

```js
generate : {
	options : {
		default : "app/scripts"
	}
}
```
```shell
grunt generate:backbone/View:TestView@login/views
#creates file '/app/scripts/login/views/TestView.js'

grunt generate:backbone/View:TestView
#creates file '/app/scripts/TestView.js'

#note the / before 'views', it tells the task to override the default
grunt generate:backbone/View:TestView@/views
#creates file '/views/TestView.js'
```

## With directory mapping

```js
generate : {
	options : {
		default : "app/scripts"
		map : {
			grunt: "/config" //note the / before 'config', it tells the task to override the default
		}
	}
}
```
```shell
grunt generate:grunt/config:jshint
#creates file '/config/jshint.js'

grunt generate:grunt/config:jshint@tasks
#creates file '/config/tasks/jshint.js'
```

## With file mapping

```js
generate : {
	options : {
		default : "app/scripts"
		map : {
			"backbone/View" : "views"
		}
	}
}
```
```shell
grunt generate:backbone/View:TestView@login
#creates file '/app/scripts/views/login/TestView.js'

grunt generate:backbone/View:TestView
#creates file '/app/scripts/views/TestView.js'
```

## With templating

```js
generate : {
	options : {
		default : "app/scripts"
		map : {
			"backbone/View" : "{{=path}}/ui/views"
		}
	}
}
```
```shell
grunt generate:backbone/View:TestView@login
#creates file '/app/scripts/login/ui/views/TestView.js'

grunt generate:backbone/View:TestView
#creates file '/app/scripts/ui/views/TestView.js'
```

