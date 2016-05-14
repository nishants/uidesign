(function () {
  "use strict"
  var timeFor = function (planet, spacecraft) {
    return spacecraft ? planet.distance / spacecraft.speed : "";
  };

  game.filter("missionTime", function(){
    return timeFor;
  });
  game.filter("totalMissionTime", function(){
    return function(planets){
      if(!planets) return 0;
      var time = 0;
      for(var i =0; i < planets.length; i++){
        var planet = planets[i];
        time += planet.spacecraft ? timeFor(planet, planet.spacecraft) : 0;
      }
      return time;
    };
  });

}).call(this);