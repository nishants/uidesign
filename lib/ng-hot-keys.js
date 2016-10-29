var module = angular.module("hot-keys", []);
module.directive("bindKeys", function () {
  var CLEAR_KEY = 91,
      isCommand = function (event) {
        return event.ctrlKey;
      },
      isEnter = function (event) {
        return event.key == "Enter";
      },
      isArrowDown = function (event) {
        return event.key == "ArrowDown";
      },
      isArrowUp = function (event) {
        return event.key == "ArrowUp";
      };

  var hotKeys = {
    "ArrowUp"   : "last",
    "ArrowDown" : "next",
    "Ctrlk"     : "clear",
    "Enter"     : "evaluate",
  };

  return {
    restrict: "C",
    scope: false,
    link: function (scope, element, attrs) {
      element.on("keyup", function (event) {
        var hotKey = "";
        hotKey += (isCommand(event)   ? "Ctrl" : "");
        hotKey += event.key;

        hotKeys[hotKey] && console.log(hotKeys[hotKey]);
      });
    },
  };
})
