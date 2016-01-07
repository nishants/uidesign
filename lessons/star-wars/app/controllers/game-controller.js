(function () {
  "use strict"
  game.controller("GameController", ["$scope", "GameService", "HelpMessageService", function($scope, GameService, HelpMessages){
    $scope.game = {
      loading  : GameService.loading,
      planets  : GameService.planets,
      vehicles : GameService.vehicles,
      reset    : function(){
        this.expandBottomBar =  false;
        this.selectedPlanet  = null;
        this.popup           = null;
        GameService.reset();
      },
      ignore: function(planet){
        var notSelected = (this.selectedPlanet && this.selectedPlanet != planet);
        var noMissionAded = this.noMoreMissions() && !planet.spacecraft;
        return noMissionAded || notSelected;
      },

      expandBottomBar: false,
      selectedPlanet: null,
      selectVehicle : function(vehicle){
        if(!this.expandBottomBar){
          return this.expandBottomBar = true;
        }
        if(!this.selectedPlanet || this.disabledVehicle(vehicle)){
          return;
        }
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
      assignedMissons : function(){
        var planets = this.planets();
        var missions = 0;
        for(var i =0; i< planets.length; i++){
          var planet = planets[i];
          missions += planet.spacecraft ? 1 : 0;
        }
        return missions;
      },
      noMoreMissions : function(){
        return this.assignedMissons() == 4;
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
        var self = this;
        GameService.submit(missions, function(foundAt){
          self.popup  = {
            title: "Your Won !",
            text : "Falcone found on planet "+ foundAt +"."
          };
        }, function(){
          self.popup  = {
            title: "You Loose !",
            text : "Falcone not found at any of the selected planets."
          };
        });
      },
      disabledVehicle: function(vehicle){
        var outOfRange = this.selectedPlanet && vehicle.range < this.selectedPlanet.distance;
        return vehicle.count == 0 || outOfRange;
      },
      cancelSelection : function(){
        this.selectedPlanet = null;
        this.expandBottomBar = false;
      },
      message : function(){
        return this.loading() ? "" : (window.message = HelpMessages.messageFor(this));
      },
    };
  }])
}).call(this);