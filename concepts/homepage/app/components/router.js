(function () {
  "use strict"
  app.directive("route", function ($location) {

    var safeApply = function(scope, fn) {
      var phase = scope.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        scope.$apply(fn);
      }
    };

    var updateRoute = function(scope, route){
      safeApply(scope, function(){
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
        $(window).trigger("hashchange");
      }
    };
  });
}).call(this);