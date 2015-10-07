(function () {
  "use strict"
  // shows when out of initial view port
  angular.module("tiktik").controller("ProgressIndicator", ['$scope', function ($scope) {

    var progressIndicator = {
      states: [
        {
          name: 'create-adset',
          label: '1. create adset',
          description: 'do the first thing, so that you can do second',
          summary: 'you did the first thing, you entered : i want food, i like mexican',
        }, {
          name: 'set-bid-parameters',
          label: '2. set bid parameters',
          description: 'do the second thing now',
          summary: null,  // set by parent controller, when field is done

          current: true
        }, {
          name: 'confirm',
          label: '3. confirm',
          description: 'do the second thing now',
          summary: null,  // set by parent controller, when field is done
        }]
    };

    $scope.progressIndicator = progressIndicator;

  }]);

}).call(this);