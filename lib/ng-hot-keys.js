var module = angular.module("hot-keys", []);
module.directive("bindKeys", function () {
  var CLEAR_KEY = 91,
      isCommand = function (event) {
        return event.key == "Meta" || event.ctrlKey;
      };

  var hotKeys = {
    "CtrlK" : "clear",
    "Ctrl[" : "clear"
  };

  return {
    restrict: "C",
    scope: false,
    link: function (scope, element, attrs) {
      element.on("keyup", function (event) {
        var hotKey = "";
        hotKey += (isCommand(event) ? "Ctrl" : "");
        hotKey += String.fromCharCode(event.keyCode);
        console.log(hotKeys[hotKey])
      });
    },
  };
})
