(function () {
  "use strict"


  game.directive("typewritter", function($timeout){
    return {
      restrict: "C",
      scope: false,
      transclude: false,
      link: function(scope, element, attrs){
        scope.$watch(attrs.ngType, function(){
          element.removeClass("show");
          $timeout(function(){
            element.html(scope.$eval(attrs.ngType));
            element.addClass("show");
          });
        });
      }
    };
  });

}).call(this);