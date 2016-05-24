(function(){
  "use strict"

  app.directive("grid", [ function(){

    return {
      restrict: "C",
      link: function(scope, element) {
        $(".state").addClass("all");
        new Grid($(element), 300).showState({name: "all", id: "all"});
      }
    };
  }]);

}).call(this);