(function () {
  "use strict"
  window.Flipper.app = angular.module("flipper", ["ui.router"]);
  window.Flipper.app.controller("AppController", function($rootScope, $timeout){
    var app         = {loaded: true},
        hideLoader  = function(){app.loaded = true;};

    $timeout(hideLoader, 5000);

    $rootScope.app = app;
  })

}).call(this);