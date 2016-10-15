(function(){
  "use strict"
  app.filter("passingCount", [ function(){
    return function(scenarios){
      return !scenarios ? 0 : scenarios.filter(function(scenario){
        return scenario.success;
      }).length;
    };
  }]);
}).call(this);