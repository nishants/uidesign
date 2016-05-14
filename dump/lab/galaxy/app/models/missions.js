(function () {
  "use strict"
  game.factory("Missions", function (server, $http) {
    var requestConfig = {headers: {Accept: "application/json", "Content-Type": "application/json"}},
        getToken = $http.post(server + "/token", {}, requestConfig);

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
      },
      findFalcone : function(){
        var request = {planet_names: [], vehicle_names: []};
        for (var i = 0; i < this.all.length; i++) {
          var mission = this.all[i];
          request.planet_names.push(mission.destination.name);
          request.vehicle_names.push(mission.vehicle.name);
        }

        getToken.then(function (response, won, lost) {
          request.token = response.data.token;
          $http.post(server + "/find", request, requestConfig).then(function (response) {
            var result = response.data;
            result.status == "success" ? won(result.planet_name) : lost();
          }, function (response) {
            console.error(response);
          });
        })
      }
    };

  });
}).call(this);