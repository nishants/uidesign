(function () {
  "use strict"
  game.factory("Vehicles", function () {
    var Vehicle = function (data) {
      this.name = data.name;
      this.count = data.total_no;
      this.range = data.max_distance;
      this.speed = data.speed;
    };

    return {
      parse: function (array) {
        var vehicles = [];
        for (var i = 0; i < array.length; i++) {
          vehicles.push(new Vehicle(array[i]));
        }
        return vehicles;
      }
    };
  });

}).call(this);