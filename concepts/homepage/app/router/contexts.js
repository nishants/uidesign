(function(){
  "use strict"
  app.factory("Contexts",function(routesConfig){
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
        };

    Context.prototype.stateByName = function(name){
      return this.states[name];
    };

    routesConfig.routes.forEach(function(config, index){
      var route = new Context(config, index);
      contexts[route.name] = route;
    });

    return {
      forName : function(routeName){
        return contexts[routeName];
      },
      switchTo : function(viewIndex, stateIndex){
      var views       = $(".views").first(),
          states      = $(".view" + viewIndex+" > .states").first(),

          viewHeight  = $("[layout]").first().height(),
          viewWidth   = $("[layout]").first().width(),

          offsetView  = viewIndex * viewWidth,
          offsetState = stateIndex * viewHeight;

      views.css("transform", "translateX(-" +offsetView +"px)");
      states.css("transform", "translateY(-"+offsetState + "px)");
    }
    };
  });
}).call(this);