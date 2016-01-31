(function(){
  "use strict"
  app.service("Contexts",function(config, layout){
    var contextsByName  = {},
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

    config.routes.forEach(function(config, index){
      var context = new Context(config, index);
      contextsByName[context.name] = context;
    });

    return {
      forName: function (name) {
        return contextsByName[name];
      },
    };
  });
}).call(this);