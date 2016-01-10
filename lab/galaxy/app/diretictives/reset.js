(function () {
  "use strict"
  galaxy.directive("reset", function(){
    return {
      restrict: "C",
      scope: false,
      transclude: false,
      link: function(scope, element, attrs){
        element.bind("click", function(){
          element.addClass("animate");
          setTimeout(function(){
            element.removeClass("animate");
          },parseInt(attrs.animationDuration));
        });
      }
    };
  });

}).call(this);