(function(){
  "use strict"
  app.factory("routes",function(routesConfig){
    var index  = {},
        Route = function(config){
          this.name   = config.name;
          this.states = config.states;
        };

    routesConfig.routes.forEach(function(config){
      var route = new Route(config);
      index[route.name] = route;
    });

    return {
      forName : function(routeName){
        return index[routeName];
      }
    };
  });
}).call(this);