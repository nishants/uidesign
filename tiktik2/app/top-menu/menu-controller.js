(function () {
  "use strict"

  angular.module("tiktik").controller("TopMenuController", ["$scope", function($scope){

    $scope.menu = {
      selectedSection: "campaigns",
      selectedTab: "campaigns",
    };

  }]);

}).call(this);