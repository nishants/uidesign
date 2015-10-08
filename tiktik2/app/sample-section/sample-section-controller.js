(function () {
  "use strict"
  // shows when out of initial view port
  angular.module("tiktik").controller("SampleSectionController", ['$scope', function ($scope) {
    var findInArray = function(field, value, arr){
      for(var i = 0; i < arr.length; i++) {
        if(arr[i][field] == value){
          return arr[i];
        }
      }
      return undefined;
    };

    var progressIndicator = {
      showStateNumbers : true,
      states: [
        {
          name: 'set-name',
          label: 'set name',
          description: 'set name for the audience',
          current: true,
          summary: 'you did the first thing, you entered : i want food, i like mexican',
        }, {
          name: 'set-demographics',
          label: 'set demographics',
          description: 'select target age/gender/regions',
        }, {
          name: 'set-targeting',
          label: 'set targeting',
          description: 'target by interests, behavior, etc.',
        }],
      showSection: function(name){
        return findInArray("name", name, this.states).current;
      }
    };

    $scope.audience = progressIndicator;
    $scope.progressIndicator = progressIndicator;

  }]);

}).call(this);