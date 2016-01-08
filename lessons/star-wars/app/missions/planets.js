(function () {
  "use strict"
  game.factory("Planets", function () {
    var Planet = function (data) {
      this.name = data.name;
      this.distance = data.distance;
      this.spacecraft = null;
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