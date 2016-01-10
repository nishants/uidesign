(function () {
  "use strict"
  game.service("GameService", function ($http, server, Vehicles, Planets) {
    var planets  = [],
        vehicles = [],

        tokenUrl = server + "/token",
        planetsUrl = server + "/planets",
        vehiclesUrl = server + "/vehicles",
        submitUrl = server + "/find",

        requestConfig = {headers: {Accept: "application/json", "Content-Type": "application/json"}},
        getToken = $http.post(tokenUrl, {}, requestConfig),

        reset = function () {
          planets = Planets.parse([{"name": "Donlon", "distance": 100}, {"name": "Enchai", "distance": 200}, {
            "name": "Jebing",
            "distance": 300
          }, {"name": "Sapir", "distance": 400}, {"name": "Lerbin", "distance": 500}, {
            "name": "Pingasor",
            "distance": 600
          }]);

          vehicles = Vehicles.parse([{"name": "Space pod", "total_no": 2, "max_distance": 200, "speed": 2}, {
            "name": "Space rocket",
            "total_no": 1,
            "max_distance": 300,
            "speed": 4
          }, {"name": "Space shuttle", "total_no": 1, "max_distance": 400, "speed": 5}, {
            "name": "Space ship",
            "total_no": 2,
            "max_distance": 600,
            "speed": 10
          }]);
        };

    reset();
    return {
      allPlanets: function(){
        return {then: function(callback){
          callback(planets);
        }};
      },
      allVehicles: function(){
        return {then: function(callback){
          callback(vehicles);
        }};
      },

      loading: function () {
        return !(planets.length && vehicles.length);
      },
      planets: function () {
        return planets;
      },
      vehicles: function () {
        return vehicles;
      },
      reset: reset,
      submit: function (missions, ifWon, ifLost) {
        var request = {planet_names: [], vehicle_names: []};
        for (var i = 0; i < missions.length; i++) {
          var mission = missions[i];
          request.planet_names.push(mission.name);
          request.vehicle_names.push(mission.spacecraft.name);
        }

        getToken.then(function (response) {
          request.token = response.data.token;
          $http.post(submitUrl, request, requestConfig).then(function (response) {
            var result = response.data;
            result.status == "success" ? ifWon(result.planet_name) : ifLost();
          }, function (response) {
            console.error(response);
          });
        });
      }
    };

  });
}).call(this);