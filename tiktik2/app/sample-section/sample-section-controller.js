(function () {
  "use strict"
  // shows when out of initial view port
  angular.module("tiktik").controller("SampleSectionController", ['$scope', function ($scope) {
    var findInArray = function (field, value, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][field] == value) {
          return i;
        }
      }
      return undefined;
    };

    var progressIndicator = {
      showStateNumbers: true,
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
    };

    $scope.wizard = {
      show: true,

      showSection: function (name) {
        var index = findInArray("name", name, progressIndicator.states);
        return index > -1 ? progressIndicator.states[index].current : undefined;
      },

      showPrev: function () {
        var index = findInArray("current", true, progressIndicator.states);
        progressIndicator.states[index].current = false;
        progressIndicator.states[index - 1].current = true;
      },

      showNext: function () {
        var index = findInArray("current", true, progressIndicator.states);
        progressIndicator.states[index].current = false;
        progressIndicator.states[index + 1].current = true;
      },

      cancel : function(){
        this.show = false;
      },

      finish: function(){
        this.cancel();
      },

      allowNext: function(){
        var state = progressIndicator.states[findInArray("current", true, progressIndicator.states)];
        return state.name == "set-name" && this.form.name;
      }
    };

    $scope.progressIndicator = progressIndicator;

  }]);

}).call(this);