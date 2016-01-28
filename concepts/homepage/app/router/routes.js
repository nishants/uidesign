(function(){
  "use strict"
  app.factory("routes",function(routesConfig){
    var index  = {},
        indexed = function(params){
          var states = {};
          params.forEach(function(state){
            states[state.name] = state;
          });
          return states;
        },
        Route = function(config){
          this.name   = config.name;
          this.states = indexed(config.states);
        };

    Route.prototype.stateByName = function(name){
      return this.states[name];
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