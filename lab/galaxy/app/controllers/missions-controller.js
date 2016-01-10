(function () {
  "use strict"
  game.controller("MissionsController", ["$scope", "GameService", "HelpMessageService", function($scope, GameService, HelpMessages){

    var galaxy = {
      ready   : false,
      ui      : {selectPlanet: false, showMenu: false},
      planets : [],
      vehicles: [],
      missions: [],
      removeMission: function(index){
        var mission = this.missions[index];
        mission.destination.assigned = false;
        mission.vehicle.count++;
        this.missions.splice(index, 1);
      },
      addMission: function(destination, vehicle){
        destination.assigned = true;
        vehicle.count--;
        this.missions.push({
          destination: destination,
          vehicle: vehicle
        });
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