(function () {
  "use strict"

  game.filter("planetIcon", function(){
    var images = {
      "Donlon"  : "images/Donlon.png",
      "Enchai"  : "images/Enchai.png",
      "Jebing"  : "images/Jebing.png",
      "Sapir"   : "images/Sapir.png",
      "Lerbin"  : "images/Lerbin.jpg",
      "Pingasor": "images/Pingasor.jpeg",
      "other"   : "images/other-planet.jpeg"
    };
    return function(planet){
      return images[planet.name] ? images[planet.name] : images["other"];
    };
  });

}).call(this);