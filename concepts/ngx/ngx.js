(function(){
    "use strict"
    var findScopesIn = function($target){
        var elements = $target.find("[ngx-scope]"),
            scopes  = [];
        for(var i =0; i < elements.length; i ++){
            var $e        = $(elements[i]),
                modelName = $e.find("[ngx-scope]");

            scopes.push({name: modelName, $target: $e});
        }
        return scopes;
    }, findModels = function($target){
        return {name: $target.find("[ngx-model]"), $target: $target};
    };

    var ngx = {
        $modules: {},
        parse: function($e){
            this.$modules[$e.attr("ngx-app")]  = $e;
        },
        module: function(name, params){
            var newModule = {scope: function () {}};
            if(params != undefined){
                findScopesIn(this.$modules[name]).forEach(function(){

                })
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