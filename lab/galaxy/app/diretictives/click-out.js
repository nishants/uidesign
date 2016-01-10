(function () {
  "use strict"
  galaxy.directive("clickOut", function($timeout){
    return {
      restrict: "A",
      scope: false,
      transclude: false,
      link: function(scope, element, attrs){
        element.bind("click", function(){
          scope.__fadeElement.removeClass("show");
          $timeout(function(){
            scope.$eval(attrs.clickOut);
          },attrs.transitionDelay);
        });
      }
    };
  });

}).call(this);