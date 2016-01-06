(function () {
  "use strict"

  game.filter("planetIcon", function(){
    var images = {
      "Donlon"  : "images/Donlon.png",
      "Enchai"  : "images/Enchai.jpg",
      "Jebing"  : "images/Jebing.jpeg",
      "Sapir"   : "images/Sapir.png",
      "Lerbin"  : "images/Lerbin.jpg",
      "Pingasor": "images/Pingasor.jpeg",
      "other"   : "images/other-planet.png"
    };
    return function(planet){
      return images[planet.name] ? images[planet.name] : images["other"];
    };
  });

}).call(this);