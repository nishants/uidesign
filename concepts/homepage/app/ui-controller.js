(function(){
  "use strict"
  app.controller("UIController", function($scope, $timeout, routesConfig, router){
    var ui = {
      ready : false,
      views: routesConfig.routes,
      router: router
    };

    $timeout(function(){
      ui.ready = true;
    }, 1000);

    $scope.ui = ui;
  });
}).call(this);