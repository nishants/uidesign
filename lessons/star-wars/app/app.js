(function(){
  "use strict"

  var game = angular.module("FindFalcone", []);
  game.value("server", "https://findfalcone.herokuapp.com");

  game.factory("Vehicles", function(){
    var Vehicle = function(data){
      this.name  = data.name;
      this.count = data.total_no;
      this.range = data.max_distance;
      this.speed = data.speed;
    };

    return {
      parse : function(array){
        var vehicles = [];
        for(var i =0; i< array.length; i++){
          vehicles.push(new Vehicle(array[i]));
        }
        return vehicles;
      }
    };
  });

  game.factory("Planets", function(){
    var Planet = function(data){
      this.name       = data.name;
      this.distance   = data.distance;
      this.spacecraft = null;
    };

    return {
      parse: function (array) {
        var planets = [];
        for(var i =0; i< array.length; i++){
          planets.push(new Planet(array[i]));
        }
        return planets;
      }
    };
  })

  game.service("FindFalconeApi", function($http, server, Vehicles, Planets){
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
  game.controller("GameController", ["$scope", "FindFalconeApi", function($scope, FindFalconeApi){
    $scope.game = {
      loading  : FindFalconeApi.loading,
      planets  : FindFalconeApi.planets,
      vehicles : FindFalconeApi.vehicles,
      expandBottomBar: false,
      selectedPlanet: null
    };
  }]);


}).call(this);