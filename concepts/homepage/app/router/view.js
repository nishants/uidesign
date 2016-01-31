(function(){
  "use strict"
  app.service("View",function(config, layout){
    var viewsByName  = {},
        statesFrom = function(params){
          var states = {};
          params.forEach(function(state, index){
            states[state.name] = state;
            states[state.name].index = index;
          });
          return states;
        },
        View = function(config, index){
          this.name   = config.name;
          this.states = statesFrom(config.states);
          this.index  = index;
          this.defaultState = this.states[""];
        };

    View.prototype.stateByName = function(name){
      return this.states[name];
    };

    View.prototype.load = function(urlQuery){
      layout.switchTo(this.index, this.defaultState.index);
    };

    config.routes.forEach(function(config, index){
      viewsByName[config.name] = new View(config, index);
    });

    return {
      forName: function (name) {
        return viewsByName[name];
      },
    };
  });
}).call(this);