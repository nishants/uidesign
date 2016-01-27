(function () {
  "use strict"
  app.directive("route", function ($location) {

    var updateRoute = function(scope, route){
      scope.$apply(function(){
        scope.ui.load(route);
      });
    };

    return {
      restrict: "C",
      scope: false,
      transclude: false,
      link: function(scope){

        var lastUrl = "#/";
        updateRoute(scope,"");
        $(window).bind("hashchange", function(){
          lastUrl != $location.url() ? updateRoute(scope, lastUrl = $location.url()) : "";
        });
      }
    };
  });
}).call(this);