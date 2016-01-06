(function () {
  "use strict"
  game.controller("GameController", ["$scope", "GameService", function($scope, GameService){
    $scope.game = {
      loading  : GameService.loading,
      planets  : GameService.planets,
      vehicles : GameService.vehicles,
      reset    : function(){
        this.expandBottomBar =  false,
        this.selectedPlanet  = null,
        GameService.reset();
      },
      expandBottomBar: false,
      selectedPlanet: null,
      selectVehicle : function(vehicle){
        this.selectedPlanet.spacecraft = vehicle;
        this.selectedPlanet = null;
        this.expandBottomBar = false;
        vehicle.count --;
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
        planet.spacecraft.count ++;
        planet.spacecraft = null;
      },
      findFalcone: function(){
        var missions = [];
        var planets = this.planets();
        for(var i =0; i< planets.length; i++){
          var planet = planets[i];
          planet.spacecraft ? missions.push(planet) : "";
        }
        GameService.submit(missions, function(foundAt){
          alert("You Win, found at " + foundAt);
        }, function(){
          alert("You Loose");
        });
      },
      disabledVehicle: function(vehicle){
        var outOfRange = this.selectedPlanet && vehicle.range < this.selectedPlanet.distance;
        return vehicle.count == 0 || outOfRange;
      },
      cancelSelection : function(){
        this.selectedPlanet = null;
        this.expandBottomBar = false;
      }
    };
  }])
}).call(this);