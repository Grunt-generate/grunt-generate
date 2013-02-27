<%= grunt.util._.camelize(appname) %>.Views.<%= grunt.util._.classify(name) %>View = Backbone.View.extend({
	events:{
		"show" : "show"
	},
	className:"",
	initialize : function(){
		this.template = _.template($("#<%= grunt.util._.classify(name) %>_tpl").html());
	},
	render: function(data) {
		var self = this;
		var locals ={};

		this.$el.html(this.template({data:locals}));

		return this;
	}
});
