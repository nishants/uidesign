var module = angular.module("hot-keys", []);
module.directive("bindKeys", function () {
  var CLEAR_KEY = 91,
      isCommand = function (event) {
        return event.key == "Meta";
      };

  return {
    restrict: "C",
    scope: false,
    link: function (scope, element, attrs) {
      element.on("keyup", function (event) {
        var clear = isCommand(event) && event.keyCode == CLEAR_KEY;
        console.log(event);
        console.log(clear ? "clear": "");
      });
    },
  };
})
