(function () {
  "use strict"
  game.filter("missionTime", function(){

    return function(planet, spacecraft){
      return spacecraft ? planet.distance / spacecraft.speed : "";
    };
  });
}).call(this);