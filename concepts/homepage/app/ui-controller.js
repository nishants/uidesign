(function(){
  "use strict"
  app.controller("UIController", function($scope, $timeout, router){
    var ui = {
      ready : false,
      views: router.routes,
      view : null,
      load: function(url){
        var routeName = url.length ? url.split("/")[1] : "default";
        this.view = {
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