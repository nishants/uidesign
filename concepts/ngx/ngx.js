(function(){
    "use strict"
    var findScopesIn = function($target){
        var elements = $target.find("[ngx-scope]"),
            scopes  = [];
        for(var i =0; i < elements.length; i ++){
            var $e   = $(elements[i]),
                name = $e.attr("ngx-scope");

            scopes.push({name: name, $target: $e});
        }
        return scopes;
    }, findModelsIn = function($target){
        var elements = $target.find("[ngx-model]"),
            models  = [];
        for(var i =0; i < elements.length; i ++){
            var $e        = $(elements[i]),
                name      = $e.attr("ngx-model");

            models.push({name: name, $target: $e});
        }
        return models;


        return {name: $target.find("[ngx-model]"), $target: $target, app : undefined};
    };

    var ngx = {
        $modules: {},
        parse: function($e){
            this.$modules[$e.attr("ngx-app")]  = $e;
        },
        module: function(name, params){
            var newModule = {scope: function () {}}, self = this;
            if(params != undefined){
                findScopesIn(self.$modules[name]).forEach(function(scope){
                    findModelsIn(self.$modules[name]).forEach(function(model){
                        console.log(model.name);
                    });
                });
            }

            return newModule;
        }
    };

    $(document).ready(function(){
        var $target = $("[ngx-app]").first();
        ngx.parse($target);
    });
    window.ngx = ngx;
}).call(this);