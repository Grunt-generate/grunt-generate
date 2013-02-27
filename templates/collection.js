<%= _.camelize(appname) %>.Collections.<%= _.classify(name) %>Collection = Backbone.Collection.extend({

    model: <%= _.camelize(appname) %>.Models.<%= _.classify(name) %>Model
    url:"",
    search : function(letters){
        if(letters == "") return this;
        var pattern = new RegExp(letters,"gi");
        return _(this.filter(function(data) {
            return pattern.test(data.get("name"));
        }));
    },
    comparator : function(item){
        return item.get("name");    
    },
    getOne : function(id){
        return this.filter(function(data) {
            return data.get("id") == id;
        });
    },
    parse : function(resp) {
        return resp.data;
    }
});

<%= _.camelize(appname) %>.Collections.<%= _.camelize(name) %> = <%= _.camelize(appname) %>.Collections.<%= _.classify(name) %>Collection;