(function(){
  "use strict"
  app.directive("svg", [function(){
    return {
      restrict  : "E",
      scope     : false,
      transclude: false,
      link      : function(scope, element, attrs){
        element.attr("width", "100%");
      }
    };
  }]);

}).call(this);