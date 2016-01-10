(function () {
  "use strict"
  game.controller("MissionsController", ["$scope", "GameService", "HelpMessageService", function($scope, GameService, HelpMessages){

    var galaxy = {
      loading : true,
      ui      : {selectPlanet: false, showMenu: false},
      planets : [],
      vehicles: [],
      missions: [],
      addMission: function(planet, vehicle){
        this.missions.push({
          destination: planet,
          vehicle: vehicle
        });
      }
    };

    GameService.allPlanets().then(function(planets){
      galaxy.planets = planets;
      galaxy.loading = galaxy.planets.length && galaxy.vehicles.length;
    });

    GameService.allVehicles().then(function(vehicles){
      galaxy.vehicles = vehicles;
      galaxy.loading = galaxy.planets.length && galaxy.vehicles.length;
    });

    $scope.galaxy = galaxy;
  }])
}).call(this);