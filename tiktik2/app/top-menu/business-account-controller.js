(function () {
  "use strict"

  angular.module("tiktik").controller("BusinessAccountController", ["$scope", function ($scope) {
    $scope.account = {
      selected: {
        business    : {name: "Tookitako", id: 1},
        account     : {name: "Demo", id: 1},
        subAccount  : {name: "Demo1", id: 1},
      },
      
      options: {
        business: [{name: "Tookitako", id: 1}, {name: "Biba", id: 2}, {name: "Rangriti", id: 3}],
        account: [{name: "Demo", id: 1}, {name: "Campaigns", id: 2}, {name: "Rangriti-Demo", id: 3}],
        subAccount: [{name: "Demo1", id: 1}, {name: "Demo2", id: 2}, {name: "Demo3", id: 3}],
      }
    };

  }]);

}).call(this);