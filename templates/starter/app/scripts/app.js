
window.chesseCake = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {}
};

yepnope({
	load: appmobile.jsFiles[appmobile.configs.env],
	complete : function () {
		var templates = 0;
		$.each(appmobile.templates[appmobile.configs.env], function(i, template){
			$.ajax({
				url: template,
				type: 'get',
				success: function(data) {
					$("body").append(data);
					templates += 1;
					if(appmobile.templates[appmobile.configs.env].length === templates){
						Backbone.history.start({pushState: false})
					}
						
				}
			});
		});
	}
});


