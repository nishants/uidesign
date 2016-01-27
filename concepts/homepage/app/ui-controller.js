(function(){
  "use strict"
  app.controller("UIController", function($scope, $timeout, router){
    var ui = {
      ready : false,
      views: router.routes,
      view : null,
      __views: {},
      load: function(url){
        var routeName = url.length ? url.split("/")[1] : "default";
        this.view = ui.__views[routeName];
      }
    };

    for(var i = 0; i < router.routes.length; i++){
      var view = router.routes[i];
      ui.__views[view.name] = view;
    }

    $timeout(function(){
      ui.ready = true;
    }, 1000);

    $scope.ui = ui;
  });
}).call(this);