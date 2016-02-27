(function(){
  "use strict"

  app.directive("display", [function(){
    return {
      restrict: 'A',
      transclude: false,
      scope: false,
      link: function(scope, element, attrs){
        scope.$watch(attrs.display, function(val){
          val ? element.removeClass("no-display") : element.addClass("no-display");
        })
      }
    };
  }])

}).call(this);