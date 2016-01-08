(function () {
  "use strict"
  game.factory("Planets", function () {
    var icons = {
      "Donlon"  : "images/Donlon.png",
      "Enchai"  : "images/Enchai.jpg",
      "Jebing"  : "images/Jebing.jpeg",
      "Sapir"   : "images/Sapir.png",
      "Lerbin"  : "images/Lerbin.jpg",
      "Pingasor": "images/Pingasor.jpeg",
      "other"   : "images/other-planet.png"
    };

    var iconFor = function(planet){
      return icons[planet.name] ? icons[planet.name] : icons["other"];
    }

    var Planet = function (data) {
      this.name = data.name;
      this.distance = data.distance;
      this.spacecraft = null;
      this.icon = iconFor(data);
    };

    return {
      parse: function (array) {
        var planets = [];
        for (var i = 0; i < array.length; i++) {
          planets.push(new Planet(array[i]));
        }
        return planets;
      }
    };
  });
}).call(this);