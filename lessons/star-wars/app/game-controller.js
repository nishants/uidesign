(function () {
  "use strict"
  game.controller("GameController", ["$scope", "GameService", function($scope, GameService){
    $scope.game = {
      loading  : GameService.loading,
      planets  : GameService.planets,
      vehicles : GameService.vehicles,
      expandBottomBar: false,
      selectedPlanet: null
    };
  }])
}).call(this);