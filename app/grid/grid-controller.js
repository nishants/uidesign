(function () {
  "use strict"
  app.controller("deckController", ["$scope", "snippetService", function($scope, snippetSerive){

    $scope.deck = {
      current: -1,
      cards : snippetSerive.all()
    }

  }]);
}).call(this);