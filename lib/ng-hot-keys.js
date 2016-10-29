var module = angular.module("hot-keys", []);
module.directive("bindKeys", ["$timeout", function ($timeout) {
  var isCommand = function (event) {
    return event.ctrlKey;
  };

  return {
    restrict: "A",
    scope: false,
    link: function (scope, element, attrs) {
      var hotKeys = scope.$eval(attrs.bindKeys);

      element.on("keyup", function (event) {
        var hotKey = "";
        hotKey += (isCommand(event)   ? "Ctrl" : "");
        hotKey += event.key;

        var action = hotKeys[hotKey];
        action && $timeout(action);
      });
    },
  };
}])
