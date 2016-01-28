(function(){
  "use strict"
  app.directive("ngApp",function($rootScope, $location, router){
    var update        = function(fn) {
      var phase = $rootScope.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        $rootScope.$apply(fn);
      }
    };

    $(window).on("hashchange", function(){
      update(function(){
        router.load($location.url());
        router.render();
      });
    });

    $(window).trigger("hashchange");
    return {
      restrict: "A",
      scope: false,
      transclude: false,
    };
  });
}).call(this);