/*global define */
define( [
  'backbone',
  'jquery'
], function( Backbone,
             $ ){
  'use strict';
  return Backbone.View.extend( {
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
  } );
} );