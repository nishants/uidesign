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
        this.selectedPlanet.spacecraft = vehicle;
        this.selectedPlanet = null;
        this.expandBottomBar = false;
      },
      selectSpacecraftFor: function(planet){
        if(this.noMoreMissions()) return;
        this.selectedPlanet = planet;
        this.expandBottomBar = true;
      },
      toggleSpacecraftMenu: function(){
        this.expandBottomBar = !this.expandBottomBar;
      },
      noMoreMissions : function(){
        var planets = this.planets();
        var missions = 0;
        for(var i =0; i< planets.length; i++){
          var planet = planets[i];
          missions += planet.spacecraft ? 1 : 0;
        }
        return missions == 4;
      },
      removeMissionFor: function(planet){
        planet.spacecraft = null;
      }
    };
  }])
}).call(this);