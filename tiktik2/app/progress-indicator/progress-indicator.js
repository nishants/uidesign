(function () {
  "use strict"
  // shows when out of initial view port
  angular.module("tiktik").controller("ProgressIndicator", ['$scope', function ($scope) {

    var progressIndicator = {
      showStateNumbers : true,
      states: [
        {
          name: 'create-adset',
          label: 'create adset',
          description: 'do the first thing, so that you can do second',
          summary: 'you did the first thing, you entered : i want food, i like mexican',
        }, {
          name: 'set-bid-parameters',
          label: 'set bid parameters',
          description: 'do the second thing now',
          summary: null,  // set by parent controller, when field is done

          current: true
        }, {
          name: 'confirm',
          label: 'confirm',
          description: 'do the second thing now',
          summary: null,  // set by parent controller, when field is done
        }]
    };

    $scope.progressIndicator = progressIndicator;

  }]);

}).call(this);