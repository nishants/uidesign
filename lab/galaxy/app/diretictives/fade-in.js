(function () {
  "use strict"
  galaxy.directive("fadeIn", function(){
    return {
      restrict: "C",
      scope: false,
      transclude: false,
      link: function(scope, element){
        setTimeout(function(){
          element.addClass("show");
        },100);
        scope.__fadeElement = element;
      }
    };
  });

}).call(this);