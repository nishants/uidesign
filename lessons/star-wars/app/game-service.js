(function () {
  "use strict"
  game.service("GameService", function ($http, server, Vehicles, Planets) {
    var planets = undefined,
        vehicles = undefined,

        tokenUrl = server + "/token",
        planetsUrl = server + "/planets",
        vehiclesUrl = server + "/vehicles",
        submitUrl = server + "/find",

        requestConfig = {headers: {Accept: "application/json", "Content-Type": "application/json"}},
        getToken = $http.post(tokenUrl, {}, requestConfig),

        reset = function () {
          planets = vehicles = null;
          $http.get(planetsUrl, requestConfig).then(function (response) {
            planets = Planets.parse(response.data);
          });
          $http.get(vehiclesUrl, requestConfig).then(function (response) {
            vehicles = Vehicles.parse(response.data);
          });
        };

    reset();
    return {
      loading: function () {
        return !(planets && vehicles);
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