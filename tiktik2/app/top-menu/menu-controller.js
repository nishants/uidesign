(function () {
  "use strict"

  angular.module("tiktik").controller("TopMenuController", ["$scope", function($scope){

    $scope.menu = {
      section:  function(name){return name == "campaigns";},
      tab: function(name){return name == "campaigns";},
      showMenuFor: function(section){console.log("showing menu for : " + section)},
      showHoveredOptions: function(){console.log("show hovering options")},
    };

  }]);

}).call(this);