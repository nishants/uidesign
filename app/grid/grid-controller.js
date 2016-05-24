(function () {
  "use strict"
  app.controller("deckController", ["$scope", "snippetService", function($scope, snippetSerive){

    $scope.deck = {
      current: -1,
      cards : snippetSerive.all()
    };

    $scope.$watch("deck.current", function(now, last){
      last != -1 && snippetSerive.unselect($scope.deck.cards[now]);
      now  != -1 && snippetSerive.select($scope.deck.cards[now]);
    });

  }]);
}).call(this);