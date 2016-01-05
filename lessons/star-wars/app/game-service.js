(function () {
  "use strict"
  game.service("GameService", function($http, server, Vehicles, Planets){
    var apiToken    = undefined,
        planets     = undefined,
        vehicles    = undefined,

        tokenUrl    = server + "/token",
        planetsUrl  = server + "/planets",
        vehiclesUrl = server + "/vehicles";

    $http.post(tokenUrl, {}, {headers: {Accept: "application/json"}}).then(function (response) {
      apiToken = response.data.token;
    });

    $http.get(planetsUrl).then(function(response){
      planets = Planets.parse(response.data);

    });

    $http.get(vehiclesUrl).then(function(response){
      vehicles = Vehicles.parse(response.data);
    });

    return {
      loading: function(){
        return !(planets && vehicles);
      },
      planets: function(){
        return planets;
      },
      vehicles: function(){
        return vehicles;
      }
    };

  });
}).call(this);