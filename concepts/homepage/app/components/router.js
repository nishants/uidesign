(function () {
  "use strict"
  app.directive("route", function ($location) {

    var updateRoute = function(scope, route){
      scope.state = {
        name: route.split("/")[1]
      };
    };

    return {
      restrict: "C",
      scope: false,
      transclude: false,
      link: function(scope, element){

        var lastUrl = "";
        scope.$watch(function(){
          lastUrl != $location.url() ? updateRoute(scope, lastUrl = $location.url()) : "";
        });
      }
    };
  });
}).call(this);