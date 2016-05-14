(function () {
  "use strict"
  galaxy.directive("fadeOut", function($timeout){
    return {
      restrict: "A",
      scope: false,
      transclude: false,
      link: function(scope, element, attrs){
        element.bind("click", function(){
          scope.__fadeElement.removeClass("show");
          $timeout(function(){
            scope.$eval(attrs.fadeOut);
          },parseInt(attrs.transitionDelay));
        });
      }
    };
  });

}).call(this);