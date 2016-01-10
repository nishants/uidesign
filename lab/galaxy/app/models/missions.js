(function () {
  "use strict"
  game.factory("Missions", function () {
    return {
      all : [],
      reset: function() {
        while (this.all.length) {
          this.remove(0);
        }
      },
      remove : function(index){
        var mission = this.all[index];
        mission.destination.assigned = false;
        mission.vehicle.count++;
        this.all.splice(index, 1);
      },
      add : function(destination, vehicle){
        this.all.push({
          destination: destination,
          vehicle: vehicle
        });
        destination.assigned = true;
        vehicle.count--;
      }
    };

  });
}).call(this);