(function () {
  "use strict"
  app.directive("route", function ($location) {

    var updateRoute = function(scope, route){
      var routeName = route.length ? route.split("/")[1] : "default";
      scope.state = {
        name: routeName
      };
    };

    return {
      restrict: "C",
      scope: false,
      transclude: false,
      link: function(scope, element){

        var lastUrl = "#/";
        updateRoute(scope,"");
        scope.$watch(function(){
          lastUrl != $location.url() ? updateRoute(scope, lastUrl = $location.url()) : "";
        });
      }
    };
  });
}).call(this);