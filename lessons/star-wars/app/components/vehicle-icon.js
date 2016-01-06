(function () {
  "use strict"

  game.filter("vehicleIcon", function(){
    var images = {
      "Space pod"     : "images/space-pod.jpg",
      "Space rocket"  : "images/space-rocket.png",
      "Space shuttle" : "images/shutle.jpeg",
      "Space ship"    : "images/spaceship.png",

      "other"   : "images/other-vehicle.jpg"
    };
    return function(vehicle){
      return vehicle ? images[vehicle.name] ? images[vehicle.name] : images["other"] : "";
    };
  });

}).call(this);