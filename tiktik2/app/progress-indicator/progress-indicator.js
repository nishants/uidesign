(function () {
  "use strict"
  // shows when out of initial view port
  angular.module("tiktik").controller("ProgressIndicator", ['$scope', function ($scope) {

    var progressIndicator = null;
    if (!$scope.progressIndicator) {
      console.error("please define progress bar in parent scope : $scope.progressIndicator = {states: [{name: 'name', label : 'label', current: true}]}");
      progressIndicator = {
        states: [
          {
            name: 'first-thing',
            label: 'first thing',
            description: 'do the first thing, so that you can do second',
            summary: 'you did the first thing, you entered : i want food, i like mexican',
          }, {
            name: 'second-thing',
            label: 'second thing',
            description: 'do the second thing now',
            summary: null,  // set by parent controller, when field is done

            current: true
          }]
      };
    }

    if(!progressIndicator){
      $scope.progressIndicator = progressIndicator;
    }


  }]);

}).call(this);