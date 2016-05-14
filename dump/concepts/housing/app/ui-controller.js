(function(){
  "use strict"
  app.controller("UIController", function($scope, $timeout){
    var ui =  {
      ready : false,
    };

    $timeout(function(){
      ui.ready = true;
    }, 500);

    $scope.ui = ui;
  });
}).call(this);