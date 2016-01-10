(function () {
  "use strict"
  game.filter("reachFor", function(){
    return function(vehicle, planet){
      return planet.distance > vehicle.range ? "out of range" : ((planet.distance/vehicle.speed) +"hours");
    };
  })
}).call(this);