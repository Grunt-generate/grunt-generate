<%= grunt.util._.camelize(appname) %>.Routers.<%= _.classify(name) %>Router = Backbone.Router.extend({
	routes: {
		"login" :  "login"
	},
	initialize : function(){
		var self = this;

	},
	login: function(){
		var self = this;
	}
});
