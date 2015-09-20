(function () {
  "use strict"
  var module = angular.module("shutter-menu", []);
  module.directive("shutterMenuBar", [function () {
    return {
      restrict: 'A',
      transclude: false,
      scope: false,
      controller: function ($scope) {
        alert($scope.sayLoud);
      }
    };
  }]);
}).call(this);