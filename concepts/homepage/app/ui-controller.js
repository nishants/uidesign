(function(){
  "use strict"
  app.controller("UIController", function($scope, ui){
    $scope.linkTo = function(view, state, params){
      params.name = state;
      return "#/"+view+"?state=" + encodeURIComponent(JSON.stringify(params))
    };
    $scope.ui = ui;
  });
}).call(this);