(function(){
  "use strict"
  app.controller("UIController", function($scope, $timeout, router){
    var ui = {
      ready : false,
      routes: router.routes,
      state : null,
      load: function(url){
        var routeName = url.length ? url.split("/")[1] : "default";
        this.state = {
          name: routeName
        };
      }
    };

    $timeout(function(){
      ui.ready = true;
    }, 1000);

    $scope.ui = ui;
  });
}).call(this);