(function () {
  "use strict"
  game.factory("Vehicles", function () {
    var icons = {
      "Space pod"     : "images/space-pod.jpg",
      "Space rocket"  : "images/space-rocket.png",
      "Space shuttle" : "images/shutle.jpeg",
      "Space ship"    : "images/spaceship.png",
      "other"         : "images/other-vehicle.jpg"
    };

    var iconFor = function (vehicle) {
      return icons[vehicle.name] ? icons[vehicle.name] : icons["other"];
    }

    var Vehicle = function (data) {
      this.name  = data.name;
      this.count = data.total_no;
      this.range = data.max_distance;
      this.speed = data.speed;
      this.icon  = iconFor(data);
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