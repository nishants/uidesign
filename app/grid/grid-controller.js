(function () {
  "use strict"
  app.controller("deckController", ["$scope", "snippetService", function($scope, snippetSerive){

    $scope.deck = {
      current: -1,
      cards : snippetSerive.all()
    };

    $scope.$watch("deck.current", function(now, last){
      last != -1 && console.log("closing :  " + $scope.deck.cards[last].title);
      now  != -1 && console.log("closing :  " + $scope.deck.cards[now].title);
    })
  }]);
}).call(this);