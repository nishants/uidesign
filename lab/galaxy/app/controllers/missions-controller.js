(function () {
  "use strict"
  game.controller("MissionsController", ["$scope", "GameService", "Missions", function($scope, GameService, Missions){

    var galaxy = {
      ready   : false,
      ui      : {selectPlanet: false, showMenu: false},
      planets : [],
      vehicles: [],
      missions: Missions,

      selectDestination: function(planet){
        if(!planet.assigned){
          galaxy.ui.selectPlanet = planet;
        }
      },

      selectVehicle: function(vehicle){
        var destination = galaxy.ui.selectPlanet,
            ignore = !(destination && vehicle.count);

        if(!ignore){
          this.missions.add(destination, vehicle);
          galaxy.ui.selectPlanet = null;
          galaxy.ui.showMenu     = false;
        }
      }
    };

    GameService.allPlanets().then(function(planets){
      galaxy.planets = planets;
      galaxy.ready   = galaxy.planets.length && galaxy.vehicles.length;
    });

    GameService.allVehicles().then(function(vehicles){
      galaxy.vehicles = vehicles;
      galaxy.ready    = galaxy.planets.length && galaxy.vehicles.length;
    });

    $scope.galaxy = galaxy;
  }])
}).call(this);