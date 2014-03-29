/*global Backbone, $ */
var app = app || {};
(function($){
  'use strict';
  app.views.<%= meta.className %> = Backbone.View.extend({
//    el : '',
//    template : '',
//    tagName : '',
//    className : '',
    events : {
    },
    initialize : function(){
    },
    render : function(){
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });
})($);