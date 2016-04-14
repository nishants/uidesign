(function(){
    "use strict"
    var ngx = {
        targets: [],
        parse: function($e){
            this.targets.push({name: $e.attr("ngx-app")});
        },
        module: function(name, params){
            var newModule = {scope: function () {}};
            return newModule;
        }
    };

    $(document).ready(function(){
        var $target = $("[ngx-app]").first();
        ngx.parse($target);
    });
    window.ngx = ngx;
}).call(this);