(function () {
  "use strict"
  game.controller("GameController", ["$scope", "GameService", function($scope, GameService){
    $scope.game = {
      loading  : GameService.loading,
      planets  : GameService.planets,
      vehicles : GameService.vehicles,
      expandBottomBar: false,
      selectedPlanet: null,
      selectVehicle : function(vehicle){
        this.selectedPlanet.spacecraft = vehicle;  this.selectedPlanet = null; this.expandBottomBar = false;
      },
      selectSpacecraftFor: function(planet){
        this.selectedPlanet = planet;
      }
    };
  }])
}).call(this);