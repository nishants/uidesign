(function(){
  "use strict"
  app.controller("UIController", function($scope, $timeout, router){
    var ui = {
      ready : false,
      routes: router.routes
    };

    $timeout(function(){
      ui.ready = true;
    }, 1000);

    $scope.ui = ui;
  });
}).call(this);