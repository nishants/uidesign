(function(){
  "use strict"
  app.service("Contexts",function(routesConfig, layout){
    var contexts  = {},
        statesFrom = function(params){
          var states = {};
          params.forEach(function(state, index){
            states[state.name] = state;
            states[state.name].index = index;
          });
          return states;
        },
        Context = function(config, index){
          this.name   = config.name;
          this.states = statesFrom(config.states);
          this.index  = index;
          this.defaultState = this.states[""];
        };

    Context.prototype.stateByName = function(name){
      return this.states[name];
    };

    Context.prototype.load = function(urlQuery){
      layout.switchTo(this.index, this.defaultState.index);
    };

    routesConfig.routes.forEach(function(config, index){
      var route = new Context(config, index);
      contexts[route.name] = route;
    });

    return {
      forName: function (routeName) {
        return contexts[routeName];
      },
    };
  });
}).call(this);