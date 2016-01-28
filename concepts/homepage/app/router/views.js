(function(){
  "use strict"
  app.factory("routes",function(routesConfig){
    var indexes  = {},
        indexed = function(params){
          var states = {};
          params.forEach(function(state, index){
            states[state.name] = state;
            states[state.name].index = index;
          });
          return states;
        },
        Route = function(config, index){
          this.name   = config.name;
          this.states = indexed(config.states);
          this.index  = index;
        };

    Route.prototype.stateByName = function(name){
      return this.states[name];
    };

    routesConfig.routes.forEach(function(config, index){
      var route = new Route(config, index);
      indexes[route.name] = route;
    });

    return {
      forName : function(routeName){
        return indexes[routeName];
      }
    };
  });
}).call(this);