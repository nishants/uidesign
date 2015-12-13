(function () {
  "use strict"
  window.Flipper.app = angular.module("flipper", ["ui.router"]);
  window.Flipper.app.controller("AppController", function($rootScope, $timeout){
    $rootScope.app = {ready: true};
  })

}).call(this);